import { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEvent,
} from './eventsController.js';

const eventsRouter = Router();

eventsRouter.get('/', getEvents);
eventsRouter.get('/:id', getEvent);
eventsRouter.post('/', createEvent);
eventsRouter.patch('/:id', updateEvent);
eventsRouter.delete('/:id', deleteEvent);

export default eventsRouter;
