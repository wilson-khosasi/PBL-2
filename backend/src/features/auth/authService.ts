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
}

export const authService = new AuthService();
