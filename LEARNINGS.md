# Learnings

Prince's own notes, 2–3 lines per session.

## Sat Sep 26, 2026: setup + scaffold

1. The proper structure for an MVC application. Each sub-application needs its own `.env` file, while one general `.gitignore` in the parent folder covers all applications.
2. There are generally two types of routes: synchronous and asynchronous, with async routes being used for external APIs. Exceptions from a sync route are handled by Express's default error handler, but the same doesn't happen for an async route. It needs an async handler to properly pass on the exception; otherwise it becomes an unhandled exception that kills the server. Once the server is down, the user who made the request gets no feedback because the connection is killed, and other users can't reach the server until it is restarted.
3. Opening a single Postgres connection to handle one request after another is slow, so it's better to open multiple connections in a pool. A request uses a connection, then returns it for the next request to pick up. Having multiple connections lets queries run in parallel.
4. Fields whose value is a moment in time should use `TIMESTAMPTZ`, so users in different time zones can use the application easily. It converts every moment to a UTC value.
