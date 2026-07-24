import type { User } from '@prisma/client';
import type { PublicUser } from './authTypes.js';

// Keep password fields out of every API response by mapping database users to
// this deliberately limited public shape.
export const toPublicUser = (user: User): PublicUser => ({
   id: user.id,
   fullName: user.fullName,
   email: user.email,
   role: user.role,
});
