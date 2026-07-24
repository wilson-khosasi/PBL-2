import express from 'express';
import type { Router } from 'express';
import { login, register } from './authController.js';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
