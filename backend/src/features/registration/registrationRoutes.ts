import express from 'express';
import type { Router } from 'express';
import { authenticate } from '@/middleware/authMiddleware.js';
import { registerEvent, getMyRegistrations, cancelRegistration } from './registrationController.js';

const router: Router = express.Router();

router.use(authenticate);
router.post('/registrations', registerEvent);
router.get('/registrations/me', getMyRegistrations);
router.delete('/registrations/:id', cancelRegistration);

export default router;
