# HIMTI Event Organizer

A learning full-stack event registration application. The project combines a React frontend with an Express API, PostgreSQL database, and Prisma ORM.

## Current features

- User registration, login, logout, and session restoration
- JWT-protected current-user endpoint (`/api/auth/me`)
- Password hashing with bcrypt
- Event browsing and event details
- Authenticated event registration and cancellation
- “My Events” page for the signed-in user
- Prisma migrations and optional event seed data
- OpenAPI specification and Scalar API documentation

## Tech stack

| Area | Technology |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Validation | Zod |
| Authentication | JWT and bcrypt |
| API documentation | OpenAPI and Scalar |

## Project structure

```text
PBL-2/
├── frontend/                 # React application
│   └── src/
│       ├── api/              # HTTP client and API functions
│       ├── components/       # Reusable UI components
│       ├── context/          # Authentication state
│       └── pages/            # Login, Register, Home, Event, My Events pages
└── backend/                  # Express API
    ├── prisma/               # Prisma schema, migrations, and seed script
    └── src/
        ├── config/           # Prisma client configuration
        ├── features/         # Feature-based modules
        │   ├── auth/         # Authentication feature
        │   ├── events/       # Event feature
        │   └── registration/ # Event registration feature
        ├── middleware/       # Authentication and error middleware
        └── routes/           # API route registration
```

## Prerequisites

Install these tools before starting:

- Node.js (LTS recommended)
- npm
- PostgreSQL

## First-time setup

### 1. Create the PostgreSQL database

Start PostgreSQL, then create an empty database. You can use pgAdmin, DBeaver, or the PostgreSQL command line:

```sql
CREATE DATABASE himti_backend;
```

You may choose another database name. If you do, use the same name in `DATABASE_URL`.

### 2. Configure the backend environment

From the `backend` directory, copy `.env.example` to `.env`.

```powershell
Copy-Item .env.example .env
```

Update `backend/.env` with your own PostgreSQL username, password, database name, and a strong JWT secret:

```env
PORT=8000
DATABASE_URL="postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/himti_backend?schema=public"
ENABLE_API_DOCS=true
JWT_SECRET="use-a-long-random-secret"
JWT_EXPIRES_IN="1d"
```

Never commit `.env`; it contains private credentials and secrets.

### 3. Configure the frontend environment

From the `frontend` directory, copy `.env.example` to `.env.local`.

```powershell
Copy-Item .env.example .env.local
```

The expected API URL is:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### 4. Install dependencies

Run the following commands once:

```powershell
cd backend
npm install

cd ../frontend
npm install
```

## PostgreSQL and Prisma migrations

Prisma is the bridge between TypeScript and PostgreSQL. The database structure is described in `backend/prisma/schema.prisma`.

### What a migration does

A migration is a versioned record of a database change. When the Prisma schema changes, Prisma generates SQL migration files. Every teammate can then apply the same change to their local database.

The current schema includes:

- `User`: authenticated users, including hashed passwords and roles
- `Event`: events that can be displayed and registered for
- `Registration`: the connection between one user and one event

`Registration` has a unique `userId + eventId` pair, so a user cannot register for the same event twice.

### Apply existing migrations

Run this after creating your database and configuring `.env`:

```powershell
cd backend
npm run prisma:migrate
```

This runs `prisma migrate dev`, which creates the required tables in your local PostgreSQL database and generates the Prisma client.

### Create a migration after changing the schema

1. Edit `backend/prisma/schema.prisma`.
2. Create a clearly named migration:

```powershell
npx prisma migrate dev --name describe_your_change
```

Example:

```powershell
npx prisma migrate dev --name add_event_category
```

3. Commit both the schema change and the newly created folder in `backend/prisma/migrations/`.

Do not manually edit the PostgreSQL tables instead of creating a migration. The schema and migrations should remain the source of truth.

### Generate the Prisma client

Run this if the Prisma client is missing or after pulling a schema change that does not require a new migration:

```powershell
npm run prisma:generate
```

### Optional: seed event data

The backend includes a seed script for sample event data. It adds any missing sample events and does not delete existing users, events, or registrations:

```powershell
npm run prisma:seed
```

### Inspect the database

Open Prisma Studio to inspect or edit local data through a browser UI:

```powershell
npm run prisma:studio
```

## Run the application

Open two terminals from the repository root.

**Terminal 1 — backend**

```powershell
cd backend
npm run dev
```

The API starts at `http://localhost:8000`.

**Terminal 2 — frontend**

```powershell
cd frontend
npm run dev
```

Vite prints the local frontend URL, usually `http://localhost:5173`.

## Authentication overview

The authentication flow is database-based. It does not use fake users or an in-memory user array.

### Register

1. The user submits full name, email, password, and confirmation password.
2. The frontend sends `POST /api/auth/register`.
3. Zod validates the request body.
4. The auth service checks that the email is not already registered.
5. bcrypt hashes the password before Prisma saves the user in PostgreSQL.

### Login

1. The user submits email and password.
2. The frontend sends `POST /api/auth/login`.
3. The backend finds the user through Prisma.
4. bcrypt compares the submitted password against the stored hash.
5. The backend returns a signed JWT and safe user information. Password hashes are never returned.

### Authenticated requests

The frontend stores the JWT locally for this learning project. Its shared API client includes it as:

```http
Authorization: Bearer <token>
```

The backend authentication middleware verifies the token, then places the authenticated user on `req.user`. Protected registration endpoints use `req.user.id`, so the browser cannot choose another user’s ID.

On a page refresh, the frontend calls `/api/auth/me` to restore the signed-in user. If the token is invalid or expired, the frontend clears it and returns to the login page.

> For a production application, consider more advanced protections against XSS and a deliberate token-storage strategy. Local storage is acceptable here because this is a learning project.

## API endpoints

| Method | Endpoint | Authentication | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/health` | No | Check API health |
| `POST` | `/api/auth/register` | No | Create an account |
| `POST` | `/api/auth/login` | No | Log in and receive a JWT |
| `GET` | `/api/auth/me` | JWT | Get the current user |
| `GET` | `/api/events` | No | List events |
| `GET` | `/api/events/:id` | No | Get one event |
| `POST` | `/api/registrations` | JWT | Register the current user for an event |
| `GET` | `/api/registrations/me` | JWT | Get the current user’s registrations |
| `DELETE` | `/api/registrations/:id` | JWT | Cancel the current user’s registration |

When `ENABLE_API_DOCS=true`, open Scalar documentation at:

```text
http://localhost:8000/api/docs
```

The raw OpenAPI document is available at:

```text
http://localhost:8000/api/openapi.json
```

## Development checks

Run these before opening a pull request or committing substantial changes:

```powershell
cd backend
npm run build
npm run lint

cd ../frontend
npm run build
npm run lint
```

## Git workflow

Recommended branch structure:

```text
main
└── develop
    └── feature/your-feature-name
```

1. Create a feature branch from `develop`.
2. Keep commits focused, for example `feat: add event registration endpoint`.
3. Run builds and lint before pushing.
4. Open a pull request into `develop`.
5. Merge `develop` into `main` only when the feature is tested and ready.

## Useful concepts in this project

- Express routing, controllers, services, and repositories
- REST APIs and HTTP status codes
- PostgreSQL relationships and Prisma migrations
- Zod request validation
- Password hashing with bcrypt
- JWT authentication middleware
- React authentication state and API calls
- Feature-based project organization
- Git branches, merge conflicts, and pull requests
