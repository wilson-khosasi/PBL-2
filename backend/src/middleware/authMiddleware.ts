import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '@/utils/appError.js';
import type { AuthenticatedUser } from '@/features/auth/authTypes.js';

const isUserRole = (
   value: unknown,
): value is AuthenticatedUser['role'] => value === 'USER' || value === 'ADMIN';

export const authenticate = (
   req: Request,
   _res: Response,
   next: NextFunction,
) => {
   try {
      const authorization = req.headers.authorization;

      if (!authorization?.startsWith('Bearer ')) {
         throw new AppError('Authentication token is required', 401);
      }

      const token = authorization.slice('Bearer '.length);

      if (!token) {
         throw new AppError('Authentication token is required', 401);
      }

      const secret = process.env.JWT_SECRET;

      if (!secret) {
         throw new Error('JWT_SECRET is not configured');
      }

      const payload = jwt.verify(token, secret);

      if (
         typeof payload === 'string' ||
         !payload.sub ||
         typeof payload.email !== 'string' ||
         !isUserRole(payload.role)
      ) {
         throw new AppError('Invalid authentication token', 401);
      }

      req.user = {
         id: payload.sub,
         email: payload.email,
         role: payload.role,
      };

      next();
   } catch (err) {
      if (err instanceof jwt.TokenExpiredError) {
         next(new AppError('Authentication token has expired', 401));
         return;
      }

      if (err instanceof jwt.JsonWebTokenError) {
         next(new AppError('Invalid authentication token', 401));
         return;
      }

      next(err);
   }
};
