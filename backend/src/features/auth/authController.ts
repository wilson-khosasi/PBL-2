import type { NextFunction, Request, Response } from 'express';
import { RegisterSchema } from './authSchema.js';
import { authService } from './authService.js';

export const register = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const input = RegisterSchema.parse(req.body);
      const user = await authService.register(input);

      res.status(201).json({
         msg: 'User registered successfully',
         data: { user },
      });
   } catch (err) {
      next(err);
   }
};
