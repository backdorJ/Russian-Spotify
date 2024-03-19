using Amazon.Extensions.NETCore.Setup;
using Amazon.Runtime;
using Amazon.S3;
using Microsoft.Extensions.DependencyInjection;
using RussianSpotify.API.Core.Abstractions;

namespace RussianSpotify.Data.S3;

/// <summary>
/// Входная точка для S3
/// </summary>
public static class Entry
{
    public static IServiceCollection AddS3Storage(
        this IServiceCollection serviceCollection, S3Options options)
    {
        if (options is null)
            throw new ArgumentNullException(nameof(options));

        if (string.IsNullOrEmpty(options.AccessKey))
            throw new ArgumentException(nameof(options.AccessKey));

        if (string.IsNullOrEmpty(options.SecretKey))
            throw new ArgumentException(nameof(options.SecretKey));

        if (string.IsNullOrEmpty(options.BucketName))
            throw new AggregateException(nameof(options.BucketName));

        if (string.IsNullOrEmpty(options.ServiceUrl))
            throw new ArgumentException(nameof(options.ServiceUrl));

        serviceCollection.AddSingleton(options);
        serviceCollection.AddSingleton<IS3Service, S3Service>();

        serviceCollection
            .AddHttpClient<S3HttpClientFactory>(opt => opt.Timeout = options.TimeOut)
            .ConfigurePrimaryHttpMessageHandler(() =>
            {
                var handler = new HttpClientHandler();
                if (options.IsIgnoreCertificateErrors)
                    handler.ServerCertificateCustomValidationCallback = (_, _, _, _) => true;

                return handler;
            })
            .Services
            .AddAWSService<IAmazonS3>(new AWSOptions()
            {
                Credentials = new BasicAWSCredentials(options.AccessKey, options.SecretKey),
                DefaultClientConfig =
                {
                    ServiceURL = options.ServiceUrl,
                    MaxErrorRetry = 0
                }
            });

        return serviceCollection;
    }
}