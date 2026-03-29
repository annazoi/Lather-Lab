import { prisma } from './src/lib/prisma';

async function check() {
  console.log('Prisma keys:', Object.keys(prisma));
  // @ts-ignore
  console.log('Prisma user model:', !!prisma.user);
  // @ts-ignore
  console.log('Prisma product model:', !!prisma.product);
}

check().catch(console.error);
