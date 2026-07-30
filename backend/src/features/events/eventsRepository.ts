import type { Event } from '@prisma/client';
import { prisma } from '@/config/prisma.js';

export class EventsRepository {
  async findAll(): Promise<Event[]> {
    return prisma.event.findMany({ orderBy: { date: 'asc' } });
  }

  async findById(id: string): Promise<Event | null> {
    return prisma.event.findUnique({ where: { id } });
  }

  async create(eventData: Omit<Event, 'id' | 'createdAt'>): Promise<Event> {
    return prisma.event.create({ data: eventData });
  }

  async update(id: string, eventData: Partial<Omit<Event, 'id' | 'createdAt'>>): Promise<Event> {
    return prisma.event.update({ where: { id }, data: eventData });
  }

  async delete(id: string): Promise<Event> {
    return prisma.event.delete({ where: { id } });
  }
}
