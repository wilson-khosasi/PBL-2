import type { User, UserRole } from '@prisma/client';
import type { z } from 'zod';
import type { LoginSchema, RegisterSchema } from './authSchema.js';

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;

export type PublicUser = Pick<User, 'id' | 'fullName' | 'email' | 'role'>;

export interface LoginResult {
   token: string;
   user: PublicUser;
}

export interface AuthenticatedUser {
   id: string;
   email: string;
   role: UserRole;
}
