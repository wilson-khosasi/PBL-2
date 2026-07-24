import {
   OpenAPIRegistry,
   OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { registerHealthDocs } from '@/docs/healthDocs.js';

const registry = new OpenAPIRegistry();

registerHealthDocs(registry);

export const generateOpenApiDocument = () => {
   const generator = new OpenApiGeneratorV3(registry.definitions);

   return generator.generateDocument({
      openapi: '3.0.0',
      info: {
         title: 'HIMTI Backend API',
         version: '1.0.0',
         description: 'API documentation for the HIMTI backend boilerplate.',
      },
   });
};
