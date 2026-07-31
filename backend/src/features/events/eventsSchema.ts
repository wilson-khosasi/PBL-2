import { z } from 'zod';

export const CreateEventSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(15, 'Description must be at least 15 characters'),
  date: z
    .string()
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: 'Invalid date',
    })
    .transform((value) => new Date(value)),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  capacity: z.number().int().min(1, 'Capacity must be at least 1'),
  imageUrl: z.string().url('Invalid image URL').optional(),
});

export const UpdateEventSchema = CreateEventSchema.partial();
export const EventIdParamSchema = z.object({
  id: z.string().uuid('Invalid event id'),
});
