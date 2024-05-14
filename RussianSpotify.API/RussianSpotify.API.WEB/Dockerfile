FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["RussianSpotify.API.WEB/RussianSpotify.API.WEB.csproj", "RussianSpotify.API.WEB/"]
COPY ["RussianSpotify.API.Data.PostgreSQL/RussianSpotify.API.Data.PostgreSQL.csproj", "RussianSpotify.API.Data.PostgreSQL/"]
COPY ["RussianSpotify.API.Contracts/RussianSpotify.API.Contracts.csproj", "RussianSpotify.API.Contracts/"]
COPY ["RussianSpotify.API.Core/RussianSpotify.API.Core.csproj", "RussianSpotify.API.Core/"]
COPY ["RussianSpotify.API.Worker/RussianSpotify.API.Worker.csproj", "RussianSpotify.API.Worker/"]
COPY ["RussianSpotify.Data.S3/RussianSpotify.Data.S3.csproj", "RussianSpotify.Data.S3/"]
RUN dotnet restore "RussianSpotify.API.WEB/RussianSpotify.API.WEB.csproj"
COPY . .
WORKDIR "/src/RussianSpotify.API.WEB"
RUN dotnet build "RussianSpotify.API.WEB.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RussianSpotify.API.WEB.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "RussianSpotify.API.WEB.dll"]
