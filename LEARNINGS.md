# Learnings

Prince's own notes, 2–3 lines per session.

## Sat Sep 26, 2026: setup + scaffold

1. The proper structure for an MVC application. Each sub-application needs its own `.env` file, while one general `.gitignore` in the parent folder covers all applications.
2. There are generally two types of routes: synchronous and asynchronous, with async routes being used for external APIs. Exceptions from a sync route are handled by Express's default error handler, but the same doesn't happen for an async route. It needs an async handler to properly pass on the exception; otherwise it becomes an unhandled exception that kills the server. Once the server is down, the user who made the request gets no feedback because the connection is killed, and other users can't reach the server until it is restarted.
3. Opening a single Postgres connection to handle one request after another is slow, so it's better to open multiple connections in a pool. A request uses a connection, then returns it for the next request to pick up. Having multiple connections lets queries run in parallel.
4. Fields whose value is a moment in time should use `TIMESTAMPTZ`, so users in different time zones can use the application easily. It converts every moment to a UTC value.

## Sun Sep 27, 2026: database + GitHub

1. `psql` defaults to my Windows username if I don't pass `-U`.
2. To run a schema against a database, I have to point `psql` at that database by name (`-d`) so it knows where to apply it. Otherwise it applies it to the default `postgres` database.

## Mon Sep 28, 2026: POST /auth/register

1. Parameterized inputs are the way to go when writing SQL queries, so attackers can't get into the database through SQL injection.
2. Validation checks are key in controller logic to limit CPU and resource usage. They also help relate the actual cause of an error if its a client error instead of returning the generic 500 error message.
3. The TypeScript compiler doesn't check SQL strings, so mistakes in queries don't show up at build time, only when a request hits that route. This is where ORMs come in to help catch such errors at runtime although a tradeoff can be that slower queries occur.

## Tue Sep 29, 2026: POST /auth/login + JWT

1. `bcrypt.compare` reads the salt from the stored hash.
2. Anyone can read a JWT, but no one can change it or create a new one without the secret. A stolen token can   still be reused until it expires, which is why the expiry is short

## Wed Sep 30, 2026: auth middleware + todos

1. If you accept a `userId` coming from the client, it can lead to an Insecure Direct Object Reference (IDOR) bug, where an attacker can use a valid JWT to write to and fetch user data from a database.
2. The difference between named and default exports: a named export has to be imported by its name, while a default export can be imported under any name. The latter can cause confusion, because different names for the same module are hard to track in a codebase.
3. Via declarative merging, properties can be added to a typescript type, which only exists at compile time.
4. Database tables are unordered in nature, hence it's best to order lists fetched from a database (e.g. latest first).

## Thu Oct 1, 2026: update + delete todos

1. Ownership checks belong in the `WHERE` clause.
