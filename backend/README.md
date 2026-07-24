# HIMTI Backend Boilerplate

A simple backend starter for HIMTI projects.

## Tech Stack

- Node.js and TypeScript
- Express
- Prisma and PostgreSQL
- Zod
- OpenAPI and Scalar
- ESLint and Prettier

## Project Structure

```txt
prisma/
└── schema.prisma
src/
├── config/
│   └── prisma.ts
├── docs/
├── features/
├── middleware/
├── routes/
│   └── routes.ts
├── utils/
└── index.ts
```

New business features go inside `src/features`. See `src/features/README.md`
for a short explanation.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create the environment file

macOS or Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 3. Start PostgreSQL

You can use an existing PostgreSQL installation or start one with Docker:

```bash
docker compose up -d postgres
```

Update `DATABASE_URL` in `.env` if your PostgreSQL username, password, port, or
database name is different.

### 4. Generate Prisma Client

```bash
npm run prisma:generate
```

### 5. Start the server

```bash
npm run dev
```

The server runs at `http://localhost:8000` with the example environment values.

## Endpoints

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| `GET`  | `/api/health`       | Check the API status  |
| `GET`  | `/api/openapi.json` | View the OpenAPI JSON |
| `GET`  | `/api/docs`         | Open the Scalar UI    |

The documentation endpoints are available when `ENABLE_API_DOCS=true`.

## Request Flow

HIMTI backend features generally follow this flow:

```txt
Route -> Controller (Schema Validation) -> Service -> Repository -> Prisma
```

- Routes define endpoint paths.
- Controllers handle requests and responses, and validate input using schemas.
- Zod schemas define the accepted request data.
- Services contain business logic.
- Repositories access the database through Prisma.

Start with only the files your feature needs. Small features do not need every
layer immediately.

## Scripts

```bash
npm run dev
npm run build
npm start
npm run lint
npm run format
npm run prisma:migrate
npm run prisma:generate
npm run prisma:studio
```

When you add your first Prisma model, create a migration with:

```bash
npm run prisma:migrate -- --name your_migration_name
```
