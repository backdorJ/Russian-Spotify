### Как запустить?

    1. Надо создать папку secrets в russian-spotify-admin-api
       Надо посмотреть видос: https://www.youtube.com/watch?v=Joz9HngdC4M , чтобы создать сертификаты
    
    2. Надо создать файл .env в папке russian-spotify-admin-api и заполнить его данными: Пример
        APP_HOST=localhost
        APP_PORT=3001
        DB_PORT=5432
        DB_HOST=localhost
        DB_USERNAME=postgres
        DB_PASSWORD=postgres
        DB_NAME=***
        RUSSIAN_SPOTIFY_API_BASE_URL="https://localhost:44361/api/"
        JWT_SECRET="***"(такой же, как на бэке)
        JWT_ISSUER="https://localhost:44361/"
        JWT_AUDIENCE="https://localhost:44361/" 

    3. В файле src/config/allowedOrigin.ts поменять порты на свои(первый для фронта админки, второй для бэка на asp.net core)
