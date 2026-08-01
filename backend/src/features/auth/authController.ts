import type { Request, Response, NextFunction } from 'express';
import { prisma } from '@/config/prisma.js';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, confirmPassword } = req.body as {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    };

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'Missing fields' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    if (!/.+@.+\.com$/.test(email)) {
      return res.status(400).json({ msg: 'Invalid email' });
    }

    if (!(password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password))) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const normalizedEmail = email.toLowerCase();

    const exists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (exists) return res.status(409).json({ msg: 'Email already registered' });

    const user = await prisma.user.create({
      data: { name, email: normalizedEmail, password, role: 'user' },
    });

    return res.status(201).json({
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
        token: `fake-token-${user.id}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ msg: 'Missing credentials' });

    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (!user) return res.status(404).json({ msg: 'Email not found' });

    if (user.password !== password) return res.status(401).json({ msg: 'Incorrect password' });

    return res.status(200).json({
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt },
        token: `fake-token-${user.id}`,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default { register, login };