export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
  event: Event;
}