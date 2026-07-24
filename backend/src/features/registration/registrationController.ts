import type { NextFunction, Request, Response } from 'express';
import { CreateRegistrationSchema, RegistrationParamsSchema } from './registrationSchema.js';
import { registrationService } from './registrationService.js';

export const registerEvent = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { eventId } = CreateRegistrationSchema.parse(req.body);
      const userId = req.body.userId; 

      const result = await registrationService.register(userId, eventId);
      res.status(201).json({ msg: 'success', data: result });
   } catch (err) {
      next(err);
   }
};

export const getMyRegistrations = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const userId = req.query.userId as string; // TEMP: ganti ke req.user.id pas auth middleware siap

      const result = await registrationService.getMyRegistrations(userId);
      res.status(200).json({ msg: 'success', data: result });
   } catch (err) {
      next(err);
   }
};

export const cancelRegistration = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = RegistrationParamsSchema.parse(req.params);
      const userId = req.body.userId; 
      await registrationService.cancel(id, userId);
      res.status(200).json({ msg: 'success', data: null });
   } catch (err) {
      next(err);
   }
};