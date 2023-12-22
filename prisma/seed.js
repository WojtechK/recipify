const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const USERS_MOCK = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123",
    profile_picture: "https://example.com/john.jpg",
    bio: "Just a regular John Doe.",
  },
  {
    username: "jane_doe",
    email: "jane@example.com",
    password: "jane1234",
    profile_picture: "https://example.com/jane.jpg",
    bio: "Jane Doe's bio goes here.",
  },
]

const load = async () => {
  try {
      await prisma.user.createMany({
        data: USERS_MOCK,
      })

    console.log("Database seeded successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
