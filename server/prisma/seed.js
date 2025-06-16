import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    
  await prisma.roadmapItem.createMany({
    data: [
      {
        title: 'Dark Mode',
        description: 'Implement dark mode across the application',
        status: 'Planned',
        category: 'UI/UX'
      },
      {
        title: 'Mobile App',
        description: 'Develop native mobile applications for iOS and Android',
        status: 'In Progress',
        category: 'Platform'
      },
      {
        title: 'API Documentation',
        description: 'Create comprehensive API documentation for developers',
        status: 'Completed',
        category: 'Documentation'
      },
      {
        title: 'User Dashboard',
        description: 'Build personalized dashboard for users',
        status: 'Planned',
        category: 'Features'
      },
      {
        title: 'Notification System',
        description: 'Implement real-time notifications',
        status: 'In Progress',
        category: 'Features'
      }
    ],
  })

  console.log('Successfully seeded roadmap items!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })