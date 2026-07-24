import bcrypt from 'bcrypt';
import type { User } from '@prisma/client';
import { AppError } from '@/utils/appError.js';
import { authRepository } from './authRepository.js';
import type { PublicUser } from './authTypes.js';
import type { RegisterInput } from './authTypes.js';

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
}

export const authService = new AuthService();
