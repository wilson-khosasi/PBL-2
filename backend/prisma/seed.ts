import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.registration.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Create dummy users (using simple password for demo - do not use in production!)
  // Password: password123 (hashed with bcrypt, but for demo we use pre-generated hash)
  const defaultPasswordHash =
    '$2a$10$YQv3Rp4pIQqznJVHxkJl5eKTqw8JZVvRDKhzGaLhG7VNvlBWq8dMu';

  const user1 = await prisma.user.create({
    data: {
      fullName: 'John Doe',
      email: 'john@example.com',
      password: defaultPasswordHash,
      role: 'USER',
    },
});

const user2 = await prisma.user.create({
    data: {
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      password: defaultPasswordHash,
      role: 'USER',
    },
});

  console.log('✅ Created users:', { user1: user1.email, user2: user2.email });

  // Create dummy events
  const now = new Date();
  const events = [
    {
      title: 'Introduction to Web Development',
      description:
        'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive workshop covers everything you need to know to start building modern web applications.',
      date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      location: 'Binus Anggrek, Lab A',
      capacity: 50,
      imageUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    },
    {
      title: 'Advanced React Patterns',
      description:
        'Dive deep into advanced React patterns and best practices. Learn about hooks, custom hooks, component composition, and state management. Perfect for developers who already have React experience.',
      date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      location: 'Binus Alam Sutera, Room 201',
      capacity: 30,
      imageUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    },
    {
      title: 'Web Design Masterclass',
      description:
        'Master the principles of modern web design. Learn UI/UX best practices, design systems, and tools like Figma. This seminar will help you create beautiful and functional web interfaces.',
      date: new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
      location: 'Online (Zoom)',
      capacity: 100,
      imageUrl:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    },
    {
      title: 'JavaScript Competition 2026',
      description:
        'Compete against other JavaScript developers in this exciting competition. Test your skills in problem-solving and coding speed. The winners will receive prizes and recognition from HIMTI.',
      date: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      location: 'Binus Anggrek, Lab B',
      capacity: 40,
      imageUrl:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
    },
    {
      title: 'Backend Development with Node.js',
      description:
        'Learn how to build scalable backend applications using Node.js and Express. This workshop covers database design, API development, authentication, and deployment strategies.',
      date: new Date(now.getTime() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
      location: 'Binus Anggrek, Lab C',
      capacity: 35,
      imageUrl:
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    },
    {
      title: 'Mobile App Development Workshop',
      description:
        'Build mobile applications for iOS and Android. Learn React Native and explore cross-platform development. Create your first mobile app in this hands-on workshop.',
      date: new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
      location: 'Binus Alam Sutera, Room 301',
      capacity: 25,
      imageUrl:
        'https://images.unsplash.com/photo-1526374965328-7f5ae4e8e7f7?w=800&h=600&fit=crop',
    },
    {
      title: 'Cloud Computing Seminar',
      description:
        'Explore cloud computing platforms like AWS, Google Cloud, and Azure. Learn about scalability, security, and cost optimization. Prepare for cloud certifications.',
      date: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago (ended)
      location: 'Online (Zoom)',
      capacity: 80,
      imageUrl:
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    },
    {
      title: 'Data Science & AI Workshop',
      description:
        'Introduction to machine learning and artificial intelligence. Learn Python, TensorFlow, and build your first ML model. Perfect for beginners interested in data science.',
      date: new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      location: 'Binus Anggrek, Lab D',
      capacity: 45,
      imageUrl:
        'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&h=600&fit=crop',
    },
  ];

  const createdEvents = await Promise.all(
    events.map((event) =>
      prisma.event.create({
        data: event,
      })
    )
  );

  console.log(`✅ Created ${createdEvents.length} events`);

  // Create some registrations
  await prisma.registration.create({
    data: {
      userId: user1.id,
      eventId: createdEvents[0].id,
    },
  });

  await prisma.registration.create({
    data: {
      userId: user1.id,
      eventId: createdEvents[1].id,
    },
  });

  await prisma.registration.create({
    data: {
      userId: user2.id,
      eventId: createdEvents[2].id,
    },
  });

  console.log('✅ Created registrations');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Seeding failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
