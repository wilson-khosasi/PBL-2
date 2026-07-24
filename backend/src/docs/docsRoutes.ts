import express from 'express';
import type { Request, Response, Router } from 'express';
import { apiReference } from '@scalar/express-api-reference';
import { generateOpenApiDocument } from './openapi.js';

const router: Router = express.Router();

router.get('/openapi.json', (_req: Request, res: Response) => {
   res.json(generateOpenApiDocument());
});

router.use(
   '/docs',
   apiReference({
      url: '/api/openapi.json',
      pageTitle: 'HIMTI Backend API',
   }),
);

export default router;
