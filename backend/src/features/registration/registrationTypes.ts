import type { Prisma } from '@prisma/client';
import { z } from 'zod';
import { CreateRegistrationSchema, RegistrationParamsSchema } from './registrationSchema.js';

export type CreateRegistrationRequest = z.infer<typeof CreateRegistrationSchema>;
export type RegistrationParamsRequest = z.infer<typeof RegistrationParamsSchema>;

export type RegistrationWithEvent = Prisma.RegistrationGetPayload<{
   include: { event: true };
}>;