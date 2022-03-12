# Relational database

We're using [golang-migrate](https://github.com/golang-migrate/migrate) to manage the migrations of our PSQL database. You can install the CLI by following the [lib's docs](https://github.com/golang-migrate/migrate/tree/master/cmd/migrate). They also provide an awesome documentation about how to use the CLI with an PostgreSQL database, which you can find [here](https://github.com/golang-migrate/migrate/blob/master/database/postgres/TUTORIAL.md).

All migrations are stored in the `/migrations` directory. Every migration creates two files: `.up.sql` and `.down.sql`. They're the basic up/down migrations concept.

- Creating a new migration: `migrate create -ext sql -dir sql-database/migrations -seq {migration_name}`
- Running migrations: `migrate -database ${POSTGRESQL_URL} -path sql-database/migrations up`
- Rollback migrations: `migrate -database ${POSTGRESQL_URL} -path sql-database/migrations down`

> Our migrations use variables from the .env file, so don't forget to setup your .env file and run `source .env` before using the migrations' commands

- DBMS: PostgreSQL
- Database name: `postgres` (default)
- Username: `postgres` (default)
- Password: `123456` (defined on `docker-compose.yaml`)
- Port: `5432` (default) mapped to `54323` on host
- A container's volume is stored in `/.data/`
- We're using [DBeaver](https://dbeaver.io/) as an IDE to manage the database

![](/sql-database/docs/database.drawio.png)

# Get started

First of all, duplicate the `.env.copy`, rename it to `.env`, and set the variables values according to your environment. They are pretty much mirrored with the `docker-compose.yaml` file. Remember to run `source .env` to apply the variables into your terminal. This is going to be required for some commands.

With our infrastructure working as supposed to, we need to run our migrations. To do so, run the following command: `migrate -database ${POSTGRESQL_URL} -path sql-database/migrations up`
