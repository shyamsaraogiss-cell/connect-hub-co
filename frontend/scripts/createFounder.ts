import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const founder = await prisma.user.upsert({
    where: {
      email: "shyamsaraogi.ss@gmail.com",
    },
    update: {
      fullName: "Shyam Kumar Saraogi",
      password:
        "$2b$10$eEg4gtAj/UBRf9MhbfZJfOHL0P2LkvKcfKl8LEItEMh2RWjTPwLnC",
      role: UserRole.FOUNDER,
      isActive: true,
    },
    create: {
      id: crypto.randomUUID(),
      fullName: "Shyam Kumar Saraogi",
      email: "shyamsaraogi.ss@gmail.com",
      password:
        "$2b$10$eEg4gtAj/UBRf9MhbfZJfOHL0P2LkvKcfKl8LEItEMh2RWjTPwLnC",
      role: UserRole.FOUNDER,
      isActive: true,
    },
  });

  console.log("Founder account ready:");
  console.log(founder);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });