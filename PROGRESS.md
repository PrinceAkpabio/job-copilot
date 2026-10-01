# Progress

Current week: 1
Last session: 2026-10-01

## Done
- [x] Week 1 · Sat Sep 26: setup + scaffold
- [x] Week 1 · Sun Sep 27: create `todo_api` database, run `schema.sql`, push to GitHub (`job-copilot` repo)
- [x] Week 1 · Mon Sep 28: `POST /auth/register` with bcrypt (Postman set up)
- [x] Week 1 · Tue Sep 29: `POST /auth/login` returning a JWT, decoded and inspected
- [x] Week 1 · Wed Sep 30: auth middleware; create and list todos for the logged-in user (IDOR reproduced and fixed)
- [x] Week 1 · Thu Oct 1: update and delete todos; attacker gets 404 on another user's todo (`getUserId` carry-over done)

## Carry-over (unfinished)
- Lock down CORS to specific origins before deploying (currently `*`)

## Open questions for next session
- `.env` is gitignored, so it never reaches GitHub. How will the deployed server get `DATABASE_URL` and `JWT_SECRET`?
