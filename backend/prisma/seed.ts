import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

const sampleEvents = [
  {
    title: 'Introduction to Web Development',
    description:
      'Learn the fundamentals of HTML, CSS, and JavaScript in a hands-on workshop for beginners.',
    date: daysFromNow(7),
    location: 'Binus Anggrek, Lab A',
    capacity: 50,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
  },
  {
    title: 'Advanced React Patterns',
    description:
      'Explore custom hooks, component composition, and practical state-management patterns for React applications.',
    date: daysFromNow(14),
    location: 'Binus Alam Sutera, Room 201',
    capacity: 30,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
  },
  {
    title: 'Web Design Masterclass',
    description:
      'Learn modern UI and UX principles and apply them to create clear, useful, and accessible interfaces.',
    date: daysFromNow(21),
    location: 'Online (Zoom)',
    capacity: 100,
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
  },
  {
    title: 'JavaScript Competition 2026',
    description:
      'Test your JavaScript problem-solving skills in a friendly competition with prizes and mentor feedback.',
    date: daysFromNow(30),
    location: 'Binus Anggrek, Lab B',
    capacity: 40,
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
  },
];

async function main() {
  console.log('Seeding sample events...');
  let createdCount = 0;

  for (const event of sampleEvents) {
    const existingEvent = await prisma.event.findFirst({
      where: { title: event.title },
    });

    if (!existingEvent) {
      await prisma.event.create({ data: event });
      createdCount += 1;
    }
  }

  console.log(`Added ${createdCount} new event(s).`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error('Database seed failed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
