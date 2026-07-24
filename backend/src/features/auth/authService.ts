import bcrypt from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';
import type { User } from '@prisma/client';
import { AppError } from '@/utils/appError.js';
import { authRepository } from './authRepository.js';
import type { LoginInput, LoginResult, PublicUser, RegisterInput } from './authTypes.js';

// Keep password fields out of every API response by mapping database users to
// this deliberately limited public shape.
export const toPublicUser = (user: User): PublicUser => ({
   id: user.id,
   fullName: user.fullName,
   email: user.email,
   role: user.role,
});

class AuthService {
   async register(input: RegisterInput): Promise<PublicUser> {
      const email = input.email.toLowerCase();
      const existingUser = await authRepository.findByEmail(email);

      if (existingUser) {
         throw new AppError('Email is already registered', 409);
      }

      const password = await bcrypt.hash(input.password, 12);
      const user = await authRepository.create({
         fullName: input.fullName,
         email,
         password,
      });

      return toPublicUser(user);
   }

   async login(input: LoginInput): Promise<LoginResult> {
      const email = input.email.toLowerCase();
      const user = await authRepository.findByEmail(email);

      if (!user) {
         throw new AppError('Invalid email or password', 401);
      }

      const isPasswordValid = await bcrypt.compare(input.password, user.password);

      if (!isPasswordValid) {
         throw new AppError('Invalid email or password', 401);
      }

      const secret = process.env.JWT_SECRET;

      if (!secret) {
         throw new Error('JWT_SECRET is not configured');
      }

      const expiresIn = (process.env.JWT_EXPIRES_IN ?? '1d') as SignOptions['expiresIn'];
      const token = jwt.sign(
         {
            sub: user.id,
            email: user.email,
            role: user.role,
         },
         secret,
         { expiresIn },
      );

      return { token, user: toPublicUser(user) };
   }

   async getCurrentUser(id: string): Promise<PublicUser> {
      const user = await authRepository.findById(id);

      if (!user) {
         throw new AppError('User not found', 404);
      }

      return toPublicUser(user);
   }
}

export const authService = new AuthService();

// Current branch: `feature/auth`  
// Latest commit: `cb2f29d`  
// Git working tree: clean — no staged, unstaged, or untracked Git-visible files.

// Current implementation state:

// - Phase 1 complete: backend dependencies, Prisma Client, local PostgreSQL connection, and migrations verified.
// - Phase 2 complete: `User` now has `fullName`, `updatedAt`, and `USER`/`ADMIN` roles; three migrations are applied.
// - Phase 3 complete: Authentication feature foundation, schemas, repository, safe user mapping, route namespace, and OpenAPI security component.
// - Phase 4 complete: `POST /api/auth/register` with Zod validation, duplicate-email protection, and bcrypt hashing.
// - Phase 5 complete: `POST /api/auth/login` with bcrypt comparison and signed JWT generation.
// - OpenAPI/Scalar documents health, register, and login endpoints.
// - Backend lint, production build, Prisma validation, and migration status all passed.
// - Phase 6 is not implemented yet: no JWT middleware and no `GET /api/auth/me`.
// - Frontend authentication is not implemented yet.
// - Existing registration endpoints still use temporary client-provided user IDs and will need JWT integration later.

// Uncommitted files:

// - None tracked by Git.

// Intentionally local, Git-ignored file:

// - `backend/.env` — contains local database/JWT configuration and must not be committed.
