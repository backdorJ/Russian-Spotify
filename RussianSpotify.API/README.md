![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/06d1664e-1b57-443b-a47d-e67f104d54ea)# Russian Spotify Web Api

## 1. Авторизация, Регистрация и Аутентификация

### Что тут происходит?

Используем Microsoft Identity + JWT, при логине выдаём JWT и RefreshToken
Для авторизации через сторонние сервисы используем библиотеки: Microsoft.AspNetCore.Authentication.Google, AspNet.Securiry.OAuth.Yandex, AspNet.Securiry.OAuth.Vkontakte
Для отправки писем на почту(для подтверждения почты и сброса пароля): MailKit

### Как сделать так, чтобы это работало?

### VK:
  1. Заходим на сайт <a href="https://dev.vk.com/ru">VK Developers</a>
![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/13b1272d-472d-44e1-9433-8d37b7e289f9)

  2. Создаём приложение

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/5a00e5ca-a9cc-4afc-9496-e4c44fad7450)

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/5e24c18b-8451-480a-b691-645ab7ae18a8)

    Для ВК неважен Redirect Url можем вписать любой, потом всё равно удалим

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/c38de115-45b9-4017-837d-f6a285745273)

    Нам нужен нужны ID приложения и Защищённый ключ, не забываем удалить Redirect Url и сохранить

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/484f1ddd-d4e9-44d0-87be-f841faf3b761)

    На вкладке авторизации убираем метки со всех полей и сохраняем

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/0831781e-343d-4ff0-9c27-2563b1df37ca)

    В доступах выбираем почту и сохраняем

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/f39cab3c-4484-4ac0-a43e-ad76a690c45d)

### Yandex:

  1. Заходим на сайт <a href="https://oauth.yandex.ru/">Yandex OAuth</a>
  
![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/e0ed9dc3-a63b-42f3-87ce-96ba164387cf)

  2. Создаём приложение

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/a80641dd-5f5b-4060-8780-50c277965717)

    Выбираем только почту

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/b2fec105-da62-487c-8d7e-33f5e8ebfa2d)

    Redirect Url: https://localhost:[port]/signin-yandex

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/ef53bdda-3faf-4921-816b-0bd5d43e26bf)

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/7b60b982-70b5-47ed-8dde-1b27c29516a4)

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/61d1e99e-d757-4a6f-80ab-d749f265a20b)

    Отсюда нам нужны ClientId и ClientSecret 

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/be2dcc10-26d4-4031-8877-a10b8c3b5cea)

### Google: 

  1. Заходим на сайт <a href="https://console.developers.google.com/?hl=ru">Google API Console</a>

  2. Создаём приложение

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/11283b57-514e-40dc-8b73-dc86cac20ed1)

    Во вкладке слева выбираем Credentials

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/106d882e-63dd-4409-8f65-92f0c2bcea67)
  
    Выбираем CONFIGURE CONSENT SCREEN 

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/0031dace-511d-4182-8280-90254bca3003)

    Выбираем External

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/9e117f45-7b08-4fd4-bab6-6127d1bb971b)

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/a68ea225-14b5-4688-9fc7-063446eb6e25)

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/f84a7e0a-2e5c-4fcc-ad8f-9605351f48c7)

    Скипаем настройку Scopes и Test Users 

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/601ff7c4-7d14-4a86-8530-94860c5cebab)

    Переходим в Credentials

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/c694af10-61d9-4acf-b720-8ffff15e9260)

    Выбираем Create Credentials и OAuth client Id

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/ab6a6a96-2807-462d-b47c-5602e45b540d)

    Redirect Url: https://localhost:[port]/signin-google

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/6e1a52c8-fb73-49d5-a4be-705390d392a3)

    Create

![image](https://github.com/backdorJ/Russian-Spotify/assets/121990701/0230ac96-7a0d-4052-b142-74dabb1ef34e)





















