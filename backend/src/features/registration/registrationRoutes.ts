import express from 'express';
import type { Router } from 'express';
import { registerEvent, getMyRegistrations, cancelRegistration } from './registrationController.js';

const router: Router = express.Router();

router.post('/registrations', registerEvent);
router.get('/registrations/me', getMyRegistrations);
router.delete('/registrations/:id', cancelRegistration);

export default router;