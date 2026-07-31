import { AppError } from '@/utils/appError.js';
import type { Event } from '@prisma/client';
import { EventsRepository } from './eventsRepository.js';

const eventsRepository = new EventsRepository();

export type CreateEventInput = Omit<Event, 'id' | 'createdAt'> & {
  imageUrl?: string | null;
};

export type UpdateEventInput = Partial<Omit<Event, 'id' | 'createdAt'>> & {
  imageUrl?: string | null;
};

export class EventsService {
  async getAllEvents(): Promise<Event[]> {
    return eventsRepository.findAll();
  }

  async getEventById(id: string): Promise<Event> {
    const event = await eventsRepository.findById(id);
    if (!event) throw new AppError('Event not found', 404);
    return event;
  }

  async createEvent(eventData: CreateEventInput): Promise<Event> {
    return eventsRepository.create(eventData);
  }

  async updateEvent(id: string, eventData: UpdateEventInput): Promise<Event> {
    const event = await eventsRepository.findById(id);
    if (!event) throw new AppError('Event not found', 404);
    return eventsRepository.update(id, eventData);
  }

  async deleteEvent(id: string): Promise<Event> {
    const event = await eventsRepository.findById(id);
    if (!event) throw new AppError('Event not found', 404);
    return eventsRepository.delete(id);
  }
}
export const eventsService = new EventsService();
