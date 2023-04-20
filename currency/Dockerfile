FROM php:8.2-cli


RUN apt-get update -y && apt-get install -y libmcrypt-dev git zip unzip

RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /app

COPY ./.env.example /app/.env

RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www


RUN chown -R www:www /app

WORKDIR /app

USER www

RUN composer install

RUN composer dump-autoload

EXPOSE 8000

CMD php artisan key:generate && php artisan optimize && php artisan migrate && php artisan schedule:work & php artisan serve --host=0.0.0.0 --port=8000 
