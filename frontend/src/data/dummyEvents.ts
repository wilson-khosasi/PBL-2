import type { AgendaItem, Event, Speaker } from '../types/registration';


const generateAvatar = (seed: string) =>
  `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9`;

const speaker = (seed: string, name: string, title: string, linkedinUrl?: string): Speaker => ({
  id: seed,
  name,
  title,
  imageUrl: generateAvatar(seed),
  linkedinUrl,
});

const agendaItem = (id: string, startTime: string, endTime: string, title: string): AgendaItem => ({
  id,
  startTime,
  endTime,
  title,
});

const defaultAgenda = (): AgendaItem[] => [
  agendaItem('a1', '09:00', '09:30', 'Opening & Welcome Speech'),
  agendaItem('a2', '09:30', '10:30', 'Keynote Session - The Future of Technology'),
  agendaItem('a3', '10:30', '10:45', 'Coffee Break'),
  agendaItem('a4', '10:45', '11:45', 'Panel Discussion - Innovation in Action'),
  agendaItem('a5', '11:45', '12:00', 'Closing & Q&A'),
];

export const dummyEvents: Event[] = [
  {
    id: 'evt-001',
    title: 'HIMTI Tech Seminar 2026',
    description:
      'Join HIMTI Tech Seminar 2026 to learn the latest trends in Artificial Intelligence, Software Engineering, Cloud Computing, and Cyber Security from industry professionals. This full-day seminar brings together practitioners and researchers to share hands-on experience, real case studies, and practical tips you can apply right away in your own projects.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 12).toISOString(),
    location: 'Binus Anggrek',
    capacity: 200,
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    price: 'FREE',
    category: 'Seminar',
    registrationStatus: 'open',
    speakers: [
      speaker('pak-doni', 'Pak Doni', 'Certified Software Engineer - Tech Company', 'https://linkedin.com'),
      speaker('kak-dina', 'Kak Dina', 'Certified UX Designer - Creative Studio', 'https://linkedin.com'),
    ],
    agenda: defaultAgenda(),
  },
  {
    id: 'evt-002',
    title: 'Frontend Development Workshop: React & Tailwind',
    description:
      'A hands-on workshop for beginners and intermediate developers who want to master modern frontend development. Participants will build a complete responsive web application from scratch using React and Tailwind CSS, guided step-by-step by experienced mentors. Laptops are required; a starter repository will be provided on the day of the event.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    location: 'Binus Alam Sutera',
    capacity: 60,
    imageUrl:
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
    price: 'Rp 35.000',
    category: 'Workshop',
    registrationStatus: 'open',
    speakers: [
      speaker('kak-arif', 'Kak Arif Wibowo', 'Frontend Engineer - Digital Solutions Inc', 'https://linkedin.com'),
    ],
    agenda: [
      agendaItem('a1', '13:00', '13:15', 'Registration & Welcoming'),
      agendaItem('a2', '13:15', '14:15', 'Introduction to React Components'),
      agendaItem('a3', '14:15', '15:15', 'Styling with Tailwind CSS'),
      agendaItem('a4', '15:15', '15:30', 'Break'),
      agendaItem('a5', '15:30', '16:30', 'Hands-on Project Build'),
      agendaItem('a6', '16:30', '17:00', 'Showcase & Wrap Up'),
    ],
  },
  {
    id: 'evt-003',
    title: 'HIMTI Coding Competition 2026',
    description:
      'Test your problem-solving and algorithmic thinking skills in our annual coding competition. Open to all students, this competition features multiple rounds of increasing difficulty, with exciting prizes for the top three teams. Bring your own laptop and get ready for a full day of intense, fun, and rewarding competitive programming.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
    location: 'Binus Anggrek',
    capacity: 120,
    imageUrl:
      'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=1200&q=80',
    price: 'Rp 50.000',
    category: 'Competition',
    registrationStatus: 'open',
    speakers: [
      speaker('kak-rian', 'Kak Rian Saputra', 'Competitive Programming Coach - Code Academy', 'https://linkedin.com'),
      speaker('kak-maya', 'Kak Maya Anggraini', 'Software Engineer - Cloud Startup', 'https://linkedin.com'),
    ],
    agenda: [
      agendaItem('a1', '08:00', '08:30', 'Registration & Briefing'),
      agendaItem('a2', '08:30', '10:30', 'Preliminary Round'),
      agendaItem('a3', '10:30', '10:45', 'Break'),
      agendaItem('a4', '10:45', '12:45', 'Final Round'),
      agendaItem('a5', '12:45', '13:30', 'Judging & Award Ceremony'),
    ],
  },
  {
    id: 'evt-004',
    title: 'Cyber Security Awareness Webinar',
    description:
      'An online session dedicated to raising awareness about everyday cyber security threats, from phishing to data breaches. Learn practical, easy-to-follow habits to keep your personal and organizational data safe, and get your questions answered live by a panel of security practitioners.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    location: 'Online (Zoom)',
    capacity: 300,
    imageUrl:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    price: 'FREE',
    category: 'Seminar',
    registrationStatus: 'open',
    speakers: [
      speaker('pak-hendra', 'Pak Hendra Kusuma', 'Cyber Security Analyst - Secure Networks Co', 'https://linkedin.com'),
    ],
    agenda: [
      agendaItem('a1', '19:00', '19:10', 'Opening'),
      agendaItem('a2', '19:10', '20:00', 'Common Cyber Threats & Case Studies'),
      agendaItem('a3', '20:00', '20:30', 'Live Q&A'),
      agendaItem('a4', '20:30', '20:45', 'Closing'),
    ],
  },
  {
    id: 'evt-005',
    title: 'Cloud Computing & DevOps Bootcamp',
    description:
      'A two-day intensive bootcamp covering the fundamentals of cloud infrastructure, containerization, and CI/CD pipelines. Ideal for students who want a practical, resume-ready introduction to how modern engineering teams ship software at scale.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    location: 'Binus Alam Sutera',
    capacity: 80,
    imageUrl:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    price: 'Rp 75.000',
    category: 'Workshop',
    registrationStatus: 'open',
    speakers: [
      speaker('kak-fajar', 'Kak Fajar Nugroho', 'Cloud Architect - Digital Solutions Inc', 'https://linkedin.com'),
      speaker('kak-sinta', 'Kak Sinta Purnama', 'DevOps Engineer - Tech Company', 'https://linkedin.com'),
    ],
    agenda: [
      agendaItem('a1', '09:00', '09:30', 'Opening & Welcome Speech'),
      agendaItem('a2', '09:30', '11:00', 'Cloud Fundamentals & Architecture'),
      agendaItem('a3', '11:00', '11:15', 'Coffee Break'),
      agendaItem('a4', '11:15', '13:00', 'Containers & CI/CD Hands-on Lab'),
      agendaItem('a5', '13:00', '13:30', 'Closing & Certificates'),
    ],
  },
  {
    id: 'evt-006',
    title: 'UI/UX Design Sprint Workshop',
    description:
      'Learn how top product teams design and validate ideas in days, not months. This workshop walks through a compressed design sprint process — from problem framing to prototyping and user testing — using real-world case studies.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8).toISOString(),
    location: 'Binus Anggrek',
    capacity: 50,
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    price: 'Rp 40.000',
    category: 'Workshop',
    registrationStatus: 'open',
    speakers: [
      speaker('kak-dina', 'Kak Dina', 'Certified UX Designer - Creative Studio', 'https://linkedin.com'),
    ],
    agenda: [
      agendaItem('a1', '09:00', '09:20', 'Icebreaker & Sprint Overview'),
      agendaItem('a2', '09:20', '10:30', 'Problem Mapping & Ideation'),
      agendaItem('a3', '10:30', '10:45', 'Break'),
      agendaItem('a4', '10:45', '12:00', 'Prototyping Session'),
      agendaItem('a5', '12:00', '12:30', 'User Testing & Wrap Up'),
    ],
  },
];

const CATEGORY_KEYWORDS: Array<{ keyword: string; category: string }> = [
  { keyword: 'competition', category: 'Competition' },
  { keyword: 'workshop', category: 'Workshop' },
  { keyword: 'bootcamp', category: 'Workshop' },
  { keyword: 'seminar', category: 'Seminar' },
  { keyword: 'webinar', category: 'Seminar' },
];

const SPEAKER_NAME_POOL: Array<{ name: string; title: string }> = [
  { name: 'Pak Doni', title: 'Certified Software Engineer - Tech Company' },
  { name: 'Kak Dina', title: 'Certified UX Designer - Creative Studio' },
  { name: 'Kak Arif Wibowo', title: 'Frontend Engineer - Digital Solutions Inc' },
  { name: 'Kak Maya Anggraini', title: 'Software Engineer - Cloud Startup' },
  { name: 'Pak Hendra Kusuma', title: 'Cyber Security Analyst - Secure Networks Co' },
  { name: 'Kak Fajar Nugroho', title: 'Cloud Architect - Digital Solutions Inc' },
];


const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const guessCategory = (event: Event): string => {
  const text = `${event.title} ${event.description}`.toLowerCase();
  const match = CATEGORY_KEYWORDS.find(({ keyword }) => text.includes(keyword));
  return match?.category ?? 'Seminar';
};

const guessPrice = (category: string): string => {
  if (category === 'Workshop') return 'Rp 35.000';
  if (category === 'Competition') return 'Rp 50.000';
  return 'FREE';
};


export function withEventExtras(event: Event): Required<Pick<Event, 'price' | 'category' | 'registrationStatus' | 'speakers' | 'agenda'>> & Event {
  const seed = hashString(event.id);
  const category = event.category ?? guessCategory(event);
  const isPast = new Date(event.date).getTime() <= Date.now();

  const firstSpeaker = SPEAKER_NAME_POOL[seed % SPEAKER_NAME_POOL.length];
  const secondSpeaker = SPEAKER_NAME_POOL[(seed + 3) % SPEAKER_NAME_POOL.length];

  const generatedSpeakers: Speaker[] =
    firstSpeaker.name === secondSpeaker.name
      ? [speaker(`${event.id}-s1`, firstSpeaker.name, firstSpeaker.title)]
      : [
          speaker(`${event.id}-s1`, firstSpeaker.name, firstSpeaker.title),
          speaker(`${event.id}-s2`, secondSpeaker.name, secondSpeaker.title),
        ];

  return {
    ...event,
    category,
    price: event.price ?? guessPrice(category),
    registrationStatus: event.registrationStatus ?? (isPast ? 'closed' : 'open'),
    speakers: event.speakers && event.speakers.length > 0 ? event.speakers : generatedSpeakers,
    agenda: event.agenda && event.agenda.length > 0 ? event.agenda : defaultAgenda(),
  };
}

export function findDummyEventById(id: string): Event | undefined {
  return dummyEvents.find((event) => event.id === id);
}
