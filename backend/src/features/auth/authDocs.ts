import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { RegisterSchema } from './authSchema.js';

export const registerAuthDocs = (registry: OpenAPIRegistry) => {
   registry.registerComponent('securitySchemes', 'BearerAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Send a valid JSON Web Token using the Bearer scheme.',
   });

   const RegisterRequest = registry.register('RegisterRequest', RegisterSchema);
   const PublicUser = registry.register(
      'PublicUser',
      z.object({
         id: z.string().uuid(),
         fullName: z.string(),
         email: z.string().email(),
         role: z.enum(['USER', 'ADMIN']),
      }),
   );

   registry.registerPath({
      method: 'post',
      path: '/api/auth/register',
      tags: ['Authentication'],
      summary: 'Create a user account',
      request: {
         body: {
            content: {
               'application/json': {
                  schema: RegisterRequest,
               },
            },
         },
      },
      responses: {
         201: {
            description: 'The user account was created successfully.',
            content: {
               'application/json': {
                  schema: z.object({
                     msg: z.literal('User registered successfully'),
                     data: z.object({ user: PublicUser }),
                  }),
               },
            },
         },
         400: { description: 'The request body failed validation.' },
         409: { description: 'The email address is already registered.' },
      },
   });
};
