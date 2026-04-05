import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function restock() {
  await prisma.product.updateMany({
    data: {
      quantity: 100,
    },
  });
  console.log('Restocked all products to 100');
  await prisma.$disconnect();
}

restock();
