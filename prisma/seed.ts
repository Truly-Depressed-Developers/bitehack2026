import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  await createUser('user@mail.com', 'user', 'user');
}

async function createUser(email: string, name: string, plainPassword: string) {
  const hashed = await bcrypt.hash(plainPassword, 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name,
      password: hashed,
    },
  });
  console.log(`Created or updated user: ${email}`);
  return user;
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
