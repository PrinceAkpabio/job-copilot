# Progress

Current week: 1
Last session: 2026-09-30

## Done
- [x] Week 1 · Sat Sep 26: setup + scaffold
- [x] Week 1 · Sun Sep 27: create `todo_api` database, run `schema.sql`, push to GitHub (`job-copilot` repo)
- [x] Week 1 · Mon Sep 28: `POST /auth/register` with bcrypt (Postman set up)
- [x] Week 1 · Tue Sep 29: `POST /auth/login` returning a JWT, decoded and inspected
- [x] Week 1 · Wed Sep 30: auth middleware; create and list todos for the logged-in user (IDOR reproduced and fixed)

## Carry-over (unfinished)
- Make `req.userId!` safe by construction instead of relying on `requireAuth` always running first

## Open questions for next session
- If the attacker sends `DELETE /todos/5` and todo 5 belongs to someone else, should the API respond 403 or 404? What does each tell the attacker?
