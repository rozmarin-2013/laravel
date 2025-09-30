FROM php:8.2-fpm

# Установка зависимостей
RUN apt-get update && apt-get install -y \
    git curl libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev zip unzip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Установка Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Создание рабочей директории
WORKDIR /var/www

# Копируем Laravel
COPY . .

# Устанавливаем зависимости
RUN composer install --no-dev --optimize-autoloader

# Права доступа для storage и bootstrap
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache
