import type { Request, Response, NextFunction } from 'express';
import { CreateEventSchema, EventIdParamSchema, UpdateEventSchema } from './eventsSchema.js';
import { eventsService } from './eventsService.js';

export const getEvents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await eventsService.getAllEvents();
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

export const getEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = EventIdParamSchema.parse(req.params);
    const data = await eventsService.getEventById(id);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = CreateEventSchema.parse(req.body);
    const eventData = {
      ...payload,
      imageUrl: payload.imageUrl ?? null,
    };
    const data = await eventsService.createEvent(eventData);
    res.status(201).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = EventIdParamSchema.parse(req.params);
    const payload = UpdateEventSchema.parse(req.body);
    const data = await eventsService.updateEvent(id, payload);
    res.status(200).json({ status: 'success', data });
  } catch (err) {
    next(err);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = EventIdParamSchema.parse(req.params);
    await eventsService.deleteEvent(id);
    res.status(200).json({ status: 'success', data: null });
  } catch (err) {
    next(err);
  }
};
