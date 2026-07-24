# Features

Create a folder here for each feature, for example `src/features/events`.

A feature can use these files when needed:

- Routes define endpoints.
- Controllers handle requests and responses.
- Services contain business logic.
- Repositories contain Prisma queries.
- Schemas validate input with Zod.

Start small. Only add files when the feature needs them. Mount feature routes in
`src/routes/routes.ts`.
