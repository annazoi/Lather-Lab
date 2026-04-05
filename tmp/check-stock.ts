import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkStock() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      discount: true,
      quantity: true,
    },
  });
  console.log(JSON.stringify(products, null, 2));
  await prisma.$disconnect();
}

checkStock();
