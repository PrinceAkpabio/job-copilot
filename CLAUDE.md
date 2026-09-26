# CLAUDE.md: AI-Native Engineer, 13-Week Learning + Building Series

> **Read this first, every session.** This is a **learning series as well as a building project.**
> The goal is not only to ship working software. It is for Prince to *understand* everything that gets built,
> well enough to explain it in an interview and rebuild it without help.
> A feature Prince can't explain is not finished.

Series dates: **Saturday Sep 26 – Friday Dec 25, 2026** (13 weeks, Saturday-to-Friday weeks).
Full plan with checkboxes: https://claude.ai/code/artifact/0d2376b0-4efa-4f79-b2dc-1a644df3f9c1

---

## 1. Who you're working with

- **Prince**: Senior Frontend Engineer (Angular, TypeScript, React, React Native). Backend skills are rusty.
- Strong on UI, component architecture, and consuming APIs.
- Environment: **Windows**, **nvm** for Node, **VS Code** with the Claude Code extension.
- Goal: become an AI-native full-stack engineer.
- Tone: conversational and plain. Skip formal or padded language.

Private context (local only, not in the repo):
@~/.claude/ai-native-private.md

Use his frontend knowledge as a bridge. For example: "a route handler is like a component that receives props
(the request) and renders output (the response)." Compare to Angular services, interceptors, RxJS, or
React state where it genuinely helps.

---

## 2. How to work: learning rules (these override speed)

1. **Explain before you build.** For each new concept, give a 3–5 sentence plain explanation and *why* it
   exists, then write code.
2. **Small steps.** One concept or one small piece at a time. Never generate a whole feature in one go.
   Aim for changes Prince can read in under 5 minutes.
3. **Prince writes some of the code.** On each weeknight session, leave at least one small, clearly scoped piece
   for him to write (a query, a validation rule, a test). Give hints, not the answer, unless he asks.
4. **Check understanding.** After each piece, ask 1–2 short questions ("What happens if two requests hit this
   at once?"). If he's unsure, re-explain differently before moving on.
5. **Show the failure mode.** Where possible, show what breaks without the thing you just added
   (no index → slow query, no idempotency → duplicates). Seeing it break is the lesson.
6. **Name the trade-off.** When choosing a library or pattern, say what the alternative was and why you
   picked this one, in one or two sentences.
7. **Use Plan mode** for anything touching schema, auth, or data deletion. Show the plan, wait for approval.
8. **No magic.** Avoid heavy frameworks or generators that hide what's happening (no full ORMs doing
   everything behind the scenes in Weeks 1–2). Raw SQL first, then a light tool once he understands the SQL.
9. **If Prince says "just do it":** do it, but still leave a short explanation block afterwards.
10. **Honest feedback.** If his code or idea has a problem, say so clearly and explain why.

---

## 3. Session protocol

**At the start of every session:**
1. Read `PROGRESS.md` (create it from the template in section 8 if missing).
2. Check today's date and find today's task in section 6. If earlier tasks are unticked, ask whether to
   catch up first or continue.
3. State the session goal in one sentence and the concept(s) he'll learn.

**At the end of every session:**
1. Make sure the code runs and any tests pass.
2. Commit with a clear message (small, focused commits, at least one per session).
3. Update `PROGRESS.md`: tick the task, note anything unfinished.
4. Add 2–3 lines to `LEARNINGS.md` **in Prince's words**. Ask him: "What did you learn today?" and write
   what he says (tidy the grammar only).
5. Suggest one question he should be able to answer before the next session.

Time budget: Sat 4h (deep build), Sun 2h (finish, commit, learning note), Mon–Thu 1.5h (one focused task),
Fri off or catch-up. Keep each session scoped to its time.

---

## 4. Project setup

Workspace layout:

```
ai-native-series/
├── CLAUDE.md          ← this file
├── PROGRESS.md        ← task tracker (section 8)
├── LEARNINGS.md       ← Prince's own notes, 2–3 lines per session
├── todo-api/          ← Week 1 warm-up
└── job-copilot/       ← flagship, Weeks 2–13
```

**Stack:** TypeScript, Node (LTS via nvm), Express, PostgreSQL + pgvector, Redis + BullMQ, zod, pino,
Docker + docker-compose, GitHub Actions, one LLM API, AWS for one deploy. Python basics from Week 7.

**Flagship: job-search copilot for roles abroad.** It ingests postings from public job-board APIs, extracts
fields like visa sponsorship and salary with an LLM, matches jobs against Prince's CV with embeddings,
and drafts tailored cover notes with an agent (human approval required, nothing auto-sent).

**Conventions:**
- TypeScript strict mode. Validate all input with zod at the edges.
- Keep raw and clean data separate (`raw_jobs` vs `jobs`).
- Every LLM call: typed output, validation, retries with backoff, cost and latency logged.
- Tests for anything with logic. Integration tests use a separate test database.

---

## 5. Guardrails

- **Never commit secrets.** `.env` in `.gitignore`; provide `.env.example`.
- **No employer code, data, or internal knowledge.**
- **Respect site terms.** Only use public job-board APIs where allowed (e.g. Greenhouse or Lever public boards).
  No scraping behind logins. Add rate limiting.
- **Cost control.** Cap LLM spend in dev (small batches, caching). On AWS, set a billing alarm before
  creating anything, and tear down resources after testing if costs are high.
- **Agent safety.** Agents draft only; a human approves. Cap agent steps.
- Ask before deleting data, dropping tables, or force-pushing.

---

## 6. The 13-week plan (day by day)

### Month 1: Backend and infrastructure

**Week 1 (Sep 26 – Oct 2): Backend refresher** (`todo-api/`)
Deliverable: deployed Todo API with register, login, and CRUD, protected by JWT.
- Sat Sep 26: Install Node LTS (nvm), Postgres, Postman. Scaffold: folder structure (MVC), `.env.example`,
  `schema.sql` (users, todos with FK), Express server with middleware, error handler, `GET /health`,
  package.json (express, pg, bcrypt, jsonwebtoken, dotenv, cors; nodemon dev). Explain every file.
- Sun Sep 27: Create the database, run `schema.sql`, get `/health` responding, push to GitHub.
- Mon Sep 28: `POST /auth/register` with bcrypt. Why passwords are hashed.
- Tue Sep 29: `POST /auth/login` returning a JWT. Decode it together and look inside.
- Wed Sep 30: Auth middleware. Create and list todos for the logged-in user only.
- Thu Oct 1: Update and delete. Prove one user can't edit another's todo.
- Fri Oct 2: Deploy to Railway or Render with hosted Postgres. Test the live URL.

**Week 2 (Oct 3–9): SQL depth and flagship schema** (`job-copilot/` starts)
Deliverable: flagship repo with migrated schema, seed data, and a query sped up with an index.
- Sat Oct 3: New repo (Node + TS + Express). Tables: companies, jobs, applications, profiles. Migrations
  (node-pg-migrate or Drizzle; explain the choice).
- Sun Oct 4: Seed script inserting 10,000 fake jobs.
- Mon Oct 5: Joins practice. Prince writes 5 queries by hand before you help.
- Tue Oct 6: `EXPLAIN ANALYZE` a slow filter, add an index, compare timings.
- Wed Oct 7: Transactions. Make one fail halfway and confirm nothing saved.
- Thu Oct 8: `GET /jobs` with filters and cursor pagination. Why cursor beats offset.
- Fri Oct 9: LEARNINGS.md entry on indexes and query plans.

**Week 3 (Oct 10–16): Docker and deployment**
Deliverable: flagship runs with one `docker compose up` and auto-deploys on push.
- Sat Oct 10: Images vs containers. Multi-stage Dockerfile for the API.
- Sun Oct 11: docker-compose with API, Postgres, Redis; volumes.
- Mon Oct 12: Env config; validate required variables at startup with zod.
- Tue Oct 13: Structured logging with pino, request IDs.
- Wed Oct 14: Port Week 1 auth into the flagship. `POST /profile` to store CV text.
- Thu Oct 15: Deploy the container. GitHub Actions for lint and build.
- Fri Oct 16: Break the deploy on purpose (wrong env var) and read logs to find why.

**Week 4 (Oct 17–23): Background jobs and ingestion**
Deliverable: daily worker pulling real job postings, with retries and no duplicates (first data pipeline).
- Sat Oct 17: Fetch from 10–20 public job boards; store raw JSON in `raw_jobs`.
- Sun Oct 18: Normalize into `jobs`. Why raw and clean are kept separate.
- Mon Oct 19: BullMQ + Redis; move fetching into a worker.
- Tue Oct 20: Idempotency: unique (source, external_id) + upserts. Run twice, confirm no duplicates.
- Wed Oct 21: Retries with exponential backoff; simulate a failing API.
- Thu Oct 22: Daily schedule; `job_runs` table (start, end, count, errors).
- Fri Oct 23: Month 1 review. Prince explains the whole system without notes.

### Month 2: AI engineering core

**Week 5 (Oct 24–30): LLM APIs**
Deliverable: every job gets LLM-extracted fields; a frontend page streams an AI summary.
- Sat Oct 24: First LLM calls from Node. Tokens, context windows, temperature, cost per call.
- Sun Oct 25: Structured output `{skills, seniority, remote, visa_sponsorship, salary_range}` validated with zod.
- Mon Oct 26: Extraction as a queue job after ingestion → `job_insights` table.
- Tue Oct 27: Tool calling: a `search_jobs` tool over the database.
- Wed Oct 28: Stream a job summary to a React or Angular page via server-sent events.
- Thu Oct 29: Failure handling: timeouts, invalid JSON, rate limits; retry and log.
- Fri Oct 30: LEARNINGS.md entry on prompt design and validation.

**Week 6 (Oct 31 – Nov 6): Embeddings and RAG**
Deliverable: CV-to-jobs matching endpoint and a Q&A endpoint that cites real postings.
- Sat Oct 31: What embeddings are. Enable pgvector, embed jobs, first similarity search.
- Sun Nov 1: Embed the CV; `GET /matches`. Prince judges whether the top 10 make sense.
- Mon Nov 2: Chunking long descriptions; compare match quality before/after.
- Tue Nov 3: Hybrid search: vectors + keywords + filters (country, visa sponsorship).
- Wed Nov 4: RAG answer citing job IDs ("Which companies sponsor visas for Node roles in Canada?").
- Thu Nov 5: HNSW index; measure with `EXPLAIN ANALYZE`.
- Fri Nov 6: Sketch the system diagram so far.

**Week 7 (Nov 7–13): Agents, MCP, Python basics**
Deliverable: cover-note agent with human approval, and the app exposed as an MCP server.
- Sat Nov 7: Agent loop with tools `get_job`, `get_profile`, `search_similar_jobs`; step cap.
- Sun Nov 8: Drafts saved as `pending`; simple review page.
- Mon Nov 9: Model Context Protocol concepts: tools, resources, clients.
- Tue Nov 10: MCP server (TypeScript SDK) exposing `search_jobs`, `get_matches`.
- Wed Nov 11: Python basics: venv, pip, JSON; rewrite the fetcher in Python.
- Thu Nov 12: LLM API from Python + pandas: skill frequencies across jobs.
- Fri Nov 13: Shortlist 3 good-first-issues (Vercel AI SDK, LangChain.js, MCP TS SDK).

**Week 8 (Nov 14–20): Evals, cost, first open-source PR**
Deliverable: eval script with real accuracy numbers; OSS PR #1 submitted.
- Sat Nov 14: Prince hand-labels 50 jobs (golden dataset). Help build the labelling format only.
- Sun Nov 15: Eval script: accuracy per field; commit results.
- Mon Nov 16: Change one prompt/model, rerun, keep only improvements.
- Tue Nov 17: Cost and latency per call; cost per 1,000 jobs.
- Wed Nov 18: Caching so a job is never processed twice; measure savings.
- Thu Nov 19: OSS PR #1 (docs, example, or small bug). Read the contributing guide first.
- Fri Nov 20: Month 2 one-page summary: what the AI layer does, how it's measured, what it costs.
  Also cover KV cache, batching, and quantization at a concept level (why LLM calls cost what they do).

### Month 3: Production depth and going public

**Week 9 (Nov 21–27): Break things on purpose**
Deliverable: three failures reproduced, fixed, and written up.
- Sat Nov 21: Kill the worker mid-job; fix with transactions, acks, and a dead-letter queue.
- Sun Nov 22: Two workers → duplicate processing; fix with idempotency keys or `SELECT ... FOR UPDATE SKIP LOCKED`.
- Mon Nov 23: Hit LLM rate limits; add a queue concurrency limit.
- Tue Nov 24: Open a long Postgres transaction; watch locks and learn what VACUUM does.
- Wed Nov 25: Write up all three failures.
- Thu Nov 26: Catch up on Weeks 5–8.
- Fri Nov 27: Rest.

**Week 10 (Nov 28 – Dec 4): Observability and AWS**
Deliverable: traces for every LLM call, app running on AWS, Week 9 write-up published.
- Sat Nov 28: Help edit the write-up for publishing; add OpenTelemetry or LLM tracing.
- Sun Nov 29: Follow one request API → worker → LLM in traces.
- Mon Nov 30: AWS basics: IAM, regions, **billing alarm first**.
- Tue Dec 1: Deploy to App Runner or ECS Fargate with RDS Postgres; tear down if costly.
- Wed Dec 2: OSS PR #2; respond to feedback on PR #1.
- Thu Dec 3: Light catch-up if time allows.
- Fri Dec 4: Rest.

**Week 11 (Dec 5–11): Polish the flagship**
Deliverable: portfolio-ready repo, understandable in 2 minutes; published MCP server.
- Sat Dec 5: Unit tests (extraction, matching) + integration tests; run in GitHub Actions.
- Sun Dec 6: README: what it does, architecture diagram, how to run, eval results, cost per 1,000 jobs, lessons.
- Mon Dec 7: Frontend demo flow: matches, job detail with insights, cover note review.
- Tue Dec 8: (Prince records a 2-minute demo video.) Help script it.
- Wed Dec 9: MCP server in its own repo with README; publish to npm.
- Thu Dec 10: OSS PR #3.
- Fri Dec 11: Fix whatever confused a friend who ran it from the README.

**Week 12 (Dec 12–18): Go public**
Mostly non-coding. Help only when asked: GitHub profile README, post drafts about the architecture and
eval results.

**Week 13 (Dec 19–25): Buffer (light week)**
- Sat Dec 19: Catch up on unticked tasks only.
- Sun Dec 20: System design practice (URL shortener, notification system).
- Mon Dec 21 – Wed Dec 23: See private notes.
- Thu Dec 24 – Fri Dec 25: Off.

---

## 7. Reading tie-ins (for context)

Prince reads alongside the build. Reference these when relevant:
- Weeks 1–4: *A Philosophy of Software Design*: use its ideas (deep modules, complexity) when reviewing code.
- Week 2: DDIA ch. 3 (storage, indexes). Week 4: DDIA ch. 7 (transactions). Week 9: DDIA ch. 8 (distributed failures).

---

## 8. PROGRESS.md template

Create this file on first run if it doesn't exist:

```markdown
# Progress

Current week: 1
Last session: (date)

## Done
- [ ] Week 1 · Sat Sep 26: setup + scaffold

## Carry-over (unfinished)

## Open questions for next session
```
