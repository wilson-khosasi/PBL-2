-- Preserve existing user data while aligning the User model with the
-- authentication API contract.
ALTER TABLE "User" RENAME COLUMN "name" TO "fullName";

-- A temporary default backfills existing rows. Prisma manages this field on
-- future writes through the @updatedAt schema attribute.
ALTER TABLE "User"
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- Convert the free-form legacy role to a constrained role enum. Unknown
-- legacy values intentionally become USER, the least-privileged role.
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;

ALTER TABLE "User"
ALTER COLUMN "role" TYPE "UserRole"
USING (
  CASE LOWER("role")
    WHEN 'admin' THEN 'ADMIN'::"UserRole"
    ELSE 'USER'::"UserRole"
  END
);

ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
