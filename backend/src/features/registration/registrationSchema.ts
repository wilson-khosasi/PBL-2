import { z } from 'zod';

export const CreateRegistrationSchema = z.object({
   eventId: z.string().uuid('Invalid event id'),
});

export const RegistrationParamsSchema = z.object({
   id: z.string().uuid('Invalid registration id'),
});