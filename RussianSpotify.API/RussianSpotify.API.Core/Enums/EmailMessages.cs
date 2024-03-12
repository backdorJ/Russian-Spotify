namespace RussianSpotify.API.Core.Enums;

public static class EmailMessages
{
    public static string ConfirmEmailMessage(string confirmationToken)
        => $@"
    <!DOCTYPE html>
    <html lang=""en"">
    <head>
        <meta charset=""UTF-8"">
        <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
        <title>Email Confirmation</title>
        <style>
            body {{
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #fff;
            }}

            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border-radius: 10px;
            }}

            .header {{
                text-align: center;
                margin-bottom: 20px;
            }}

            .title {{
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 10px;
            }}

            .message {{
                font-size: 20px;
                line-height: 1.5;
                margin-bottom: 20px;
                text-align: center;
            }}

            .code {{
                font-family: monospace;
                font-size: 32px;
                font-weight: bold;
                padding: 10px;
                margin-bottom: 20px;
                text-align: center;
                color: #81b71a;
            }}
        </style>
    </head>
    <body>
        <div class=""container"">
            <div class=""header"">
                <h1 class=""title"">Email Confirmation</h1>
            </div>
            <br>
            <div class=""message"">
                <p>Hello from Russian Spotify!</p>
                <p>To confirm your email, enter the code:</p>
                <p class=""code"">
                    {confirmationToken}
                </p>
            </div>
        </div>
    </body>
    </html>";

    public static string ConfirmPasswordResetMessage(string confirmationToken)
        => $@"
    <!DOCTYPE html>
    <html lang=""en"">
    <head>
        <meta charset=""UTF-8"">
        <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
        <title>Password Reset Confirmation</title>
        <style>
            body {{
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                background-color: #000000;
                color: #fff;
            }}

            .container {{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border-radius: 10px;
            }}

            .header {{
                text-align: center;
                margin-bottom: 20px;
            }}

            .title {{
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 10px;
            }}

            .message {{
                font-size: 20px;
                line-height: 1.5;
                margin-bottom: 20px;
                text-align: center;
            }}

            .code {{
                font-family: monospace;
                font-size: 32px;
                font-weight: bold;
                padding: 10px;
                margin-bottom: 20px;
                text-align: center;
                color: #81b71a;
            }}
        </style>
    </head>
    <body>
        <div class=""container"">
            <div class=""header"">
                <h1 class=""title"">Password Reset Confirmation</h1>
            </div>
            <br>
            <div class=""message"">
                <p>Hello from Russian Spotify!</p>
                <p>To reset your password, enter the code</p>
                <p class=""code"">
                    {confirmationToken}
                </p>
            </div>
        </div>
    </body>
    </html>";
}