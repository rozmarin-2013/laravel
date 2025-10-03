# Laravel Blog with Inertia.js, React, TailwindCSS, Docker

This is a simple blog application built with Laravel, Inertia.js, React, Tailwind CSS, and Docker.

## Requirements

- Docker & Docker Compose
- PHP >= 8.x (inside container)
- Node.js & npm/yarn (inside container)

---

## Project Setup

### 1. Clone the repository

git clone <your-repo-url>
cd <project-folder>

### 2. Copy `.env` file

cp .env.example .env

Update database credentials if needed:

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=laravel
DB_PASSWORD=secret

---

### 3. Docker Makefile commands

The project uses a `Makefile` to simplify Docker commands.

| Command           | Description                                      |
|------------------|--------------------------------------------------|
| `make init`       | Build containers, install composer packages, run migrations & seeders |
| `make up`         | Start containers in the background              |
| `make stop`       | Stop containers                                 |
| `make restart`    | Restart containers                              |
| `make down`       | Stop and remove containers                      |
| `make clear-cache`| Clear Laravel cache, config, routes, views, optimize |
| `make test`       | Run Laravel tests inside container              |
| `make yarn-run`   | Run `yarn dev` for frontend assets              |
| `make migrate`    | Run Laravel migrations                           |

---

## Running the project

### 1. Initialize the environment

make init

This will:

- Build Docker containers
- Start containers
- Install PHP dependencies
- Generate Laravel key
- Publish migrations for Spatie packages
- Run migrations and seeders
- Stop containers (ready to start again)

### 2. Start Docker containers

make up

### 3. Run Laravel server

Laravel backend runs inside Docker container (`app`). Routes are exposed according to your `docker-compose.yml` configuration.

### 4. Run frontend (React + Inertia + Tailwind) for develop

npm i (for first install app)
npm run dev (for develop)
npm run build (for deploy)

This runs Vite in watch mode.  
Open the app in your browser at `http://localhost:8000` (Vite dev server).

---

## Running Tests

make test

Runs Laravel feature and unit tests inside the `app` container.

---

## Database Access

- Database container is exposed on port `33060` on host.
- To access MySQL:

docker compose exec db mysql -u laravel -p
# password: secret

---
---

## Stopping containers

make stop

---

## Removing containers

make down

---

## Frontend development

- Make sure Docker containers are running (make up)
- Watch frontend assets:

make yarn-run

- Open the browser at `http://localhost:8000` 
