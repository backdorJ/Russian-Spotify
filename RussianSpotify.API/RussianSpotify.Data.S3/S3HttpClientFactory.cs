using Amazon.Runtime;

namespace RussianSpotify.Data.S3;

/// <summary>
/// Фабрика http клиентов для S3
/// </summary>
public class S3HttpClientFactory : HttpClientFactory
{
    private readonly HttpClient _httpClient;

    /// <summary>
    /// Конструктор
    /// </summary>
    /// <param name="httpClient">Клиент http</param>
    public S3HttpClientFactory(HttpClient httpClient)
        => _httpClient = httpClient;

    /// <inheritdoc />
    public override HttpClient CreateHttpClient(IClientConfig clientConfig) => _httpClient;
}