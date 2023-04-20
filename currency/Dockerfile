FROM php:8.2-cli


# RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh && bash nodesource_setup.sh

RUN apt-get update -y && apt-get install -y libmcrypt-dev 

RUN docker-php-ext-install mysqli pdo pdo_mysql
# libnode72
# RUN apt-get install -y nodejs

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /app
COPY .env.example /app/.env

RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www


RUN chown -R www:www /app

USER www

WORKDIR /app

# RUN npm install
# RUN npm run build

RUN composer install

EXPOSE 8000

RUN chown -R www:www /app


CMD php artisan optimize && php artisan migrate && php artisan schedule:work & php artisan serve --host=0.0.0.0 --port=8000 
