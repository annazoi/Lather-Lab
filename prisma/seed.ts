import * as dotenv from 'dotenv';
import { join } from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config({ path: join(process.cwd(), '.env.local') });
console.log('ENV PATH:', process.cwd());
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const prisma = new PrismaClient();

const allProducts = [
	{
		name: 'French Green Clay',
		price: 18.0,
		category: 'Purifying & Balancing',
		image: 'soap-1.png',
		isBestSeller: false,
	},
	{
		name: 'Activated Charcoal',
		price: 20.0,
		category: 'Deep Cleanse & Detox',
		image: 'soap-2.png',
		isBestSeller: false,
	},
	{
		name: 'Colloidal Oatmeal',
		price: 18.0,
		category: 'Soothing & Nourishing',
		image: 'soap-3.png',
		isBestSeller: true,
	},
	{
		name: 'Lavender & Sage',
		price: 22.0,
		category: 'Calming & Relaxing',
		image: 'soap-1.png',
		isBestSeller: false,
	},
	{
		name: 'Wild Rose & Rosehip',
		price: 24.0,
		category: 'Hydrating & Anti-Aging',
		image: 'soap-2.png',
		isBestSeller: true,
	},
	{
		name: 'Cedar & Sea Salt',
		price: 18.0,
		category: 'Exfoliating & Refreshing',
		image: 'soap-3.png',
		isBestSeller: false,
	},
];

async function main() {
	console.log('Seeding Database...');
	for (const p of allProducts) {
		await prisma.product.create({
			data: p,
		});
	}
	console.log('Seeding completed!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
