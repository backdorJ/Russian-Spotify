using System.Net;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Logging;
using RussianSpotify.API.Core.Abstractions;
using RussianSpotify.API.Core.Exceptions;
using RussianSpotify.API.Core.Models;

namespace RussianSpotify.Data.S3;

public class S3Service : IS3Service
{
    private const string DefaultContentType = "application/octet-stream";

    /// <summary>
    /// Поле метаданных для Названия файла
    /// </summary>
    private const string FilenameMetadataField = "x-amz-meta-filename";

    private readonly S3Options _s3Options;
    private readonly IAmazonS3 _client;
    private readonly ILogger<S3Service> _logger;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="s3Options">Настройки для S3</param>
    /// <param name="client">Клиент http</param>
    /// <param name="factory">Фабрика</param>
    /// <param name="logger">Логгер</param>
    public S3Service(
        S3Options s3Options,
        IAmazonS3 client,
        S3HttpClientFactory factory,
        ILogger<S3Service> logger)
    {
        _s3Options = s3Options;
        _client = client;
        _logger = logger;
        var config = (AmazonS3Config)_client.Config;
        config.HttpClientFactory = factory;
        config.ForcePathStyle = true;
    }

    /// <inheritdoc />
    public async Task<string> UploadAsync(
        FileContent fileContent,
        bool needAutoCloseStream = true,
        CancellationToken cancellationToken = default)
    {
        if (fileContent.FileName == null)
            throw new ArgumentNullException(nameof(fileContent.FileName));

        if (fileContent.Content == null)
            throw new ArgumentNullException(nameof(fileContent.Content));

        var putObject = new PutObjectRequest
        {
            BucketName = string.IsNullOrEmpty(fileContent.Bucket) ? _s3Options.BucketName : fileContent.Bucket,
            Key = ContentKey(fileContent.FileName),
            InputStream = fileContent.Content,
            ContentType = string.IsNullOrEmpty(fileContent.ContentType) ? DefaultContentType : fileContent.ContentType,
            AutoCloseStream = needAutoCloseStream,
        };

        putObject.Metadata.Add(FilenameMetadataField, Uri.EscapeDataString(fileContent.FileName));

        await _client.PutObjectAsync(putObject, cancellationToken);
        return putObject.Key;
    }

    /// <inheritdoc />
    public async Task<FileContent?> DownloadFileAsync(
        string key,
        string? bucket = default,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(key))
            throw new ArgumentNullException(nameof(key));

        var request = new GetObjectRequest
        {
            BucketName = string.IsNullOrEmpty(bucket) ? _s3Options.BucketName : bucket,
            Key = key,
        };

        try
        {
            var response = await _client.GetObjectAsync(request, cancellationToken: cancellationToken);

            if (response?.ResponseStream == null)
                return null;

            var fileNameFromS3 = response.Metadata?.Keys.Contains(FilenameMetadataField) == true
                ? Uri.UnescapeDataString(response.Metadata[FilenameMetadataField])
                : "unnamed";

            return new FileContent(
                content: response.ResponseStream,
                fileName: fileNameFromS3,
                contentType: response.Headers?.ContentType ?? DefaultContentType,
                bucket: response.BucketName);
        }
        catch (AmazonServiceException e)
        {
            if (e.StatusCode == HttpStatusCode.NotFound)
            {
                _logger.LogCritical($"Bucket not found...");
            }

            throw;
        }
    }

    /// <inheritdoc/>
    public async Task DeleteAsync(string key, string? bucket = default, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(key))
            throw new ArgumentNullException(nameof(key));

        var request = new DeleteObjectRequest
        {
            BucketName = string.IsNullOrEmpty(bucket) ? _s3Options.BucketName : bucket,
            Key = key
        };

        try
        {
            var response = await _client.DeleteObjectAsync(request, cancellationToken);
        }
        catch (AmazonServiceException e)
        {
            _logger.LogError(e.Message);
            var internalException = new InternalException(e.Message);
            throw internalException;
        }
    }

    private string ContentKey(string? fileName)
        => $"{DateTime.UtcNow.Date:dd:MM:yyyy}/{Guid.NewGuid()}/{fileName}";
}