import express from 'express';
import type { Router } from 'express';
import { authenticate } from '@/middleware/authMiddleware.js';
import { getCurrentUser, login, register } from './authController.js';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);

export default router;
