import express from 'express';
import type { Router } from 'express';
import { register } from './authController.js';

const router: Router = express.Router();

router.post('/register', register);

export default router;
