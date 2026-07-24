import type { NextFunction, Request, Response } from 'express';
import { LoginSchema, RegisterSchema } from './authSchema.js';
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

export const login = async (
   req: Request,
   res: Response,
   next: NextFunction,
) => {
   try {
      const input = LoginSchema.parse(req.body);
      const result = await authService.login(input);

      res.status(200).json({
         msg: 'Login successful',
         data: result,
      });
   } catch (err) {
      next(err);
   }
};
