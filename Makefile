DOCKER_COMPOSE=docker compose
DOCKER_COMPOSE_APP=$(DOCKER_COMPOSE) exec app
DOCKER_COMPOSE_APP_COMPOSER=$(DOCKER_COMPOSE_APP) composer
DOCKER_COMPOSE_APP_PHP_ARTISAN=$(DOCKER_COMPOSE_APP) php artisan
DOCKER_COMPOSE_APP_NODE=$(DOCKER_COMPOSE) exec node

init:
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d
	$(DOCKER_COMPOSE_APP_COMPOSER) install
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) key:generate
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) vendor:publish --provider="Spatie\\Activitylog\\ActivitylogServiceProvider" --tag="activitylog-migrations"
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) migrate --seed
	$(DOCKER_COMPOSE) stop

up:
	$(DOCKER_COMPOSE) up -d

stop:
	$(DOCKER_COMPOSE) stop

restart:
	$(DOCKER_COMPOSE) restart

down:
	$(DOCKER_COMPOSE) down

clear-cache:
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) cache:clear
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) config:clear
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) route:clear
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) view:clear
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) optimize:clear

test:
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) test



migrate:
	$(DOCKER_COMPOSE_APP_PHP_ARTISAN) migrate







