import type { Registration, Prisma } from '@prisma/client';
import { prisma } from '@/config/prisma.js';
import type { RegistrationWithEvent } from './registrationTypes.js';

class RegistrationRepository {
   async create(data: Prisma.RegistrationCreateInput): Promise<Registration> {
      return await prisma.registration.create({ data });
   }

   async findByUserAndEvent(userId: string, eventId: string): Promise<Registration | null> {
      return await prisma.registration.findUnique({
         where: { userId_eventId: { userId, eventId } },
      });
   }

   async findByUser(userId: string): Promise<RegistrationWithEvent[]> {
      return await prisma.registration.findMany({
         where: { userId },
         include: { event: true },
      });
   }

   async findById(id: string): Promise<Registration | null> {
      return await prisma.registration.findUnique({ where: { id } });
   }

   async delete(id: string): Promise<Registration> {
      return await prisma.registration.delete({ where: { id } });
   }

   async countByEvent(eventId: string): Promise<number> {
      return await prisma.registration.count({ where: { eventId } });
   }
}

export const registrationRepository = new RegistrationRepository();