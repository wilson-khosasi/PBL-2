import express from 'express';
import type { Request, Response, Router } from 'express';
import authRoutes from '@/features/auth/authRoutes.js';
import registrationRoutes from '@/features/registration/registrationRoutes.js';
import authRoutes from '@/features/auth/authRoutes.js';
const router: Router = express.Router();
router.get('/health', (_req: Request, res: Response) => {
   res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
   });
});
router.use('/auth', authRoutes);
router.use('/', registrationRoutes);
export default router;
