import type { NextFunction, Request, Response } from 'express';
import { AppError } from '@/utils/appError.js';
import { CreateRegistrationSchema, RegistrationParamsSchema } from './registrationSchema.js';
import { registrationService } from './registrationService.js';

export const registerEvent = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { eventId } = CreateRegistrationSchema.parse(req.body);
      if (!req.user) {
         throw new AppError('Authentication token is required', 401);
      }
      const result = await registrationService.register(req.user.id, eventId);
      res.status(201).json({ msg: 'success', data: result });
   } catch (err) {
      next(err);
   }
};

export const getMyRegistrations = async (req: Request, res: Response, next: NextFunction) => {
   try {
      if (!req.user) {
         throw new AppError('Authentication token is required', 401);
      }
      const result = await registrationService.getMyRegistrations(req.user.id);
      res.status(200).json({ msg: 'success', data: result });
   } catch (err) {
      next(err);
   }
};

export const cancelRegistration = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = RegistrationParamsSchema.parse(req.params);
      if (!req.user) {
         throw new AppError('Authentication token is required', 401);
      }
      await registrationService.cancel(id, req.user.id);
      res.status(200).json({ msg: 'success', data: null });
   } catch (err) {
      next(err);
   }
};
