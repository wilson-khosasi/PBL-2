import { z } from 'zod';

export const RegisterSchema = z
   .object({
      fullName: z.string().trim().min(1, 'Full name is required'),
      email: z.string().trim().email('Please provide a valid email address'),
      password: z
         .string()
         .min(8, 'Password must be at least 8 characters long'),
      confirmPassword: z.string(),
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
   });

export const LoginSchema = z.object({
   email: z.string().trim().email('Please provide a valid email address'),
   password: z.string().min(1, 'Password is required'),
});
