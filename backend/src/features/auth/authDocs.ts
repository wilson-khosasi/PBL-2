import type { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

export const registerAuthDocs = (registry: OpenAPIRegistry) => {
   registry.registerComponent('securitySchemes', 'BearerAuth', {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Send a valid JSON Web Token using the Bearer scheme.',
   });
};
