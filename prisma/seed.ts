import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i <= 5; i++) {
    const username = faker.internet.userName();
    const password = await bcrypt.hash('password123', 10); // Hash a default password

    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    console.log(`Created user: ${user.username}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
