import type { Registration } from '@prisma/client';
import { AppError } from '@/utils/appError.js';
import { prisma } from '@/config/prisma.js';
import { registrationRepository } from './registrationRepository.js';
import type { RegistrationWithEvent } from './registrationTypes.js';

class RegistrationService {
   async register(userId: string, eventId: string): Promise<Registration> {
      const event = await prisma.event.findUnique({ where: { id: eventId } });

      if (!event) {
         throw new AppError('Event not found', 404);
      }

      const existing = await registrationRepository.findByUserAndEvent(userId, eventId);

      if (existing) {
         throw new AppError('Already registered for this event', 409);
      }

      const currentCount = await registrationRepository.countByEvent(eventId);

      if (currentCount >= event.capacity) {
         throw new AppError('Event is full', 400);
      }

      return await registrationRepository.create({
         user: { connect: { id: userId } },
         event: { connect: { id: eventId } },
      });
   }

   async getMyRegistrations(userId: string): Promise<RegistrationWithEvent[]> {
      return await registrationRepository.findByUser(userId);
   }

   async cancel(registrationId: string, userId: string): Promise<Registration> {
      const registration = await registrationRepository.findById(registrationId);

      if (!registration) {
         throw new AppError('Registration not found', 404);
      }

      if (registration.userId !== userId) {
         throw new AppError('You can only cancel your own registration', 403);
      }

      return await registrationRepository.delete(registrationId);
   }
}

export const registrationService = new RegistrationService();