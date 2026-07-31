import express from 'express';
import type { Router } from 'express';
import { authenticate } from '@/middleware/authMiddleware.js';
import { registerEvent, getMyRegistrations, cancelRegistration } from './registrationController.js';

const router: Router = express.Router();

router.post('/registrations', authenticate, registerEvent);
router.get('/registrations/me', authenticate, getMyRegistrations);
router.delete('/registrations/:id', authenticate, cancelRegistration);

export default router;
