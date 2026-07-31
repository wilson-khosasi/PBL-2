export interface Speaker {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  linkedinUrl?: string;
}

export interface AgendaItem {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  imageUrl?: string;
  price?: string;
  category?: string;
  registrationStatus?: 'open' | 'closed';
  speakers?: Speaker[];
  agenda?: AgendaItem[];
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  registeredAt: string;
  event: Event;
}