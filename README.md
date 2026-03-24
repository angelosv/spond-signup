# Spond Club — Membership Signup

Full-stack membership registration form built with Next.js and Go, backed by PostgreSQL.

## Getting Started

### Run with Docker (recommended)
```bash
git clone https://github.com/youruser/spond-signup.git
cd spond-signup
docker compose up --build
```

Open http://localhost:3000

### Run locally (for development)

**Prerequisites:** Go 1.26+, Node.js 20+, Docker

Start Postgres:
```bash
docker compose up postgres
```

Backend:
```bash
cd backend
air
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Running Tests

Backend:
```bash
cd backend
go test ./...
```

Frontend:
```bash
cd frontend
npm run test
npm run test:e2e
```


- **comments** — the form spec mentions group selection in Step 1, but the current /form endpoint does not return groups. requires a new endpoint GET /groups include available groups.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js + TypeScript + Tailwind |
| Backend | Go |
| Database | PostgreSQL |
| Infra | Docker Compose |

