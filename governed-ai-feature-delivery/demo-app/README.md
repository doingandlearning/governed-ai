# Demo app — local setup

This folder contains a small **NestJS** API (`backend/`) and a **Vite + React** UI (`frontend/`) used in the governed AI feature delivery course. Run both processes locally for the full experience.

## Prerequisites

- **Node.js** **20.19+** or **22.12+** (required by Vitest/Vite; see troubleshooting below).
- **npm** (comes with Node).

Check your version:

```bash
node --version
```

If you use [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm), run `nvm install` / `fnm install` from this folder — `.nvmrc` pins **20.19.0**.

## 1. Backend

```bash
cd backend
cp .env-example .env
npm install
```

Edit `.env` as needed. Defaults use `APP_PROFILE=dev` with mock LLM behavior, so you can run without a real API key. To call OpenAI, set `LLM_MODE=openai`, `OPENAI_API_KEY`, and optionally `OPENAI_BASE_URL` (see `backend/.env-example` comments).

**Development server** (watches files, loads `.env`):

```bash
npm run dev
```

The API listens on **http://localhost:3000** (override with `PORT` in `.env`).

**Production-style run** (after compile):

```bash
npm run build
npm run start
```

Health check:

```bash
curl http://localhost:3000/documents/health
```

More detail (profiles, extraction contract, evals, release gate): **`backend/README.md`**. Operational demos (kill switch, rollback): **`backend/OPERATIONS.md`**.

## 2. Frontend

The API allows the Vite dev origin **http://localhost:5173** only. Keep the UI on that port unless you change CORS in `backend/src/main.nest.ts`.

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open the URL Vite prints (typically **http://localhost:5173**).  
`VITE_API_BASE_URL` in `.env` must match the backend (default: `http://localhost:3000`).

## 3. Typical workflow

1. Terminal A: `cd backend && npm run dev`
2. Terminal B: `cd frontend && npm run dev`
3. Use the UI against the running API, or call `POST /documents/extract` directly as documented in `backend/README.md`.

## Optional checks

From `backend/`:

```bash
npm test
```

From `frontend/`:

```bash
npm run lint
npm run build
```

## Troubleshooting (Node version)

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| `bad option: --env-file` | Node older than 20.6 | Upgrade to **20.19+** (scripts now load `.env` via dotenv instead). |
| `tsx: command not found` on `npm run dev` | Global `tsx` missing | Run `npm install` in `backend/` — `tsx` is a dev dependency; use `npm run dev` or `npm run dev:nest`. |
| Vitest/Vite install or test errors on Node 20.0–20.18 | Toolchain needs native bindings from newer Node | Upgrade to **Node 20.19+** or **22 LTS**. |
| Errors when `APP_PROFILE=stage` or Mastra enabled | `@mastra/core` targets Node **22.13+** | Use `APP_PROFILE=dev` locally, or upgrade to Node 22 for stage/prod demos. |

Default `APP_PROFILE=dev` avoids loading Mastra at startup so Node 20.19+ is enough for the usual workshop path.
