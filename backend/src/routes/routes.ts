import express from 'express';
import type { Request, Response, Router } from 'express';
import registrationRoutes from '@/features/registration/registrationRoutes.js';
import authRoutes from '@/features/auth/authRoutes.js';
import eventsRoutes from '@/features/events/eventsRoutes.js';
const router: Router = express.Router();
router.get('/health', (_req: Request, res: Response) => {
   res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
   });
});
router.use('/', registrationRoutes);
router.use('/', authRoutes);
router.use('/events', eventsRoutes);
export default router;