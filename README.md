# NPR - Node.js / PostgreSQL / Redis

Simple containerized backend application.
- Express: server/routing
- Redis: can be used for caching/rate-limiting
- Prisma/Postgres: persistent database and Prisma ORM

Run services to test against by `cd`ing into `app/docker/` and running `docker compose up`. Run integration test by `cd`ing into `app/` and running `npm test`.
