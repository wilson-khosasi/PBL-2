import type { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

type User = {
  id: string;
  name: string;
  email: string;
  password: string; // NOTE: plain-text for dev only
};

// simple in-memory user store for development
const users: User[] = [];

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

    const exists = users.find((u) => u.email === email.toLowerCase());
    if (exists) return res.status(409).json({ msg: 'Email already registered' });

    const user: User = { id: randomUUID(), name, email: email.toLowerCase(), password };
    users.push(user);

    return res.status(201).json({ data: { user: { id: user.id, name: user.name, email: user.email, role: 'member', createdAt: new Date().toISOString() }, token: `fake-token-${user.id}` } });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) return res.status(400).json({ msg: 'Missing credentials' });

    const user = users.find((u) => u.email === email.toLowerCase());
    if (!user) return res.status(404).json({ msg: 'Email not found' });

    if (user.password !== password) return res.status(401).json({ msg: 'Incorrect password' });

    return res.status(200).json({ data: { user: { id: user.id, name: user.name, email: user.email, role: 'member', createdAt: new Date().toISOString() }, token: `fake-token-${user.id}` } });
  } catch (err) {
    next(err);
  }
};

export default { register, login };
