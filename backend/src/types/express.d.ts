import type { AuthenticatedUser } from '@/features/auth/authTypes.js';

declare global {
   namespace Express {
      interface Request {
         user?: AuthenticatedUser;
      }
   }
}

export {};
