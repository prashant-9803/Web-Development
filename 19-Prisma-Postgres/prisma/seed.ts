import { prisma } from "../src/db";

async function createUsers() {
  const users = await prisma.user.createMany({
    data: [
      {
        username: "prashant",
        password: "hashed_password_123",
        city: "Pune",
      },
      {
        username: "rahul",
        password: "hashed_password_456",
        city: "Mumbai",
      },
      {
        username: "amit",
        password: "hashed_password_789",
        city: "Delhi",
      },
    ],
    skipDuplicates: true,
  });

  console.log(`${users.count} users created`);
}

async function createTodos() {
  const users = await prisma.user.findMany({
    where: {
      username: {
        in: ["prashant", "rahul", "amit"],
      },
    },
  });

  const userMap = new Map(users.map((user) => [user.username, user.id]));

  const todos = [
    {
      title: "Learn Prisma",
      description: "Understand Prisma ORM",
      done: true,
      userId: userMap.get("prashant")!,
    },
    {
      title: "Build Todo API",
      description: "Create CRUD APIs using Express",
      done: false,
      userId: userMap.get("prashant")!,
    },
    {
      title: "Learn TypeScript",
      description: "Practice interfaces and generics",
      done: false,
      userId: userMap.get("rahul")!,
    },
    {
      title: "Learn PostgreSQL",
      description: "Practice SQL queries",
      done: true,
      userId: userMap.get("amit")!,
    },
  ];

  await prisma.todo.createMany({
    data: todos,
  });

  console.log("Todos created successfully");
}

async function main() {
  await createUsers();
  await createTodos();
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
