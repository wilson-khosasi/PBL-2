import express from 'express';
import type { Router } from 'express';
import authController from './authController.js';

const router: Router = express.Router();

router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

export default router;
