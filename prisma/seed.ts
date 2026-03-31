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
		description:
			'A deeply purifying bar formulated with French Green Clay to draw out impurities and balance oils. Benefits: Deeply cleanses pores, Controls excess oil, Rich in natural minerals, Suitable for oily skin.',
	},
	{
		name: 'Activated Charcoal',
		price: 20.0,
		category: 'Deep Cleanse & Detox',
		image: 'soap-2.png',
		isBestSeller: false,
		description:
			'Purify your skin with activated charcoal that acts like a magnet to pull dirt from pores. Benefits: Draws out toxins, Improves skin clarity, Gentle exfoliation, Unscented and vegan.',
	},
	{
		name: 'Colloidal Oatmeal',
		price: 18.0,
		category: 'Soothing & Nourishing',
		image: 'soap-3.png',
		isBestSeller: true,
		description:
			'Calm sensitive skin with our soothing oatmeal bar, perfect for maintaining natural hydration. Benefits: Relieves itchy skin, Locks in moisture, Dermatologist recommended, Fragrance free.',
	},
	{
		name: 'Lavender & Sage',
		price: 22.0,
		category: 'Calming & Relaxing',
		image: 'soap-1.png',
		isBestSeller: false,
		description:
			'A tranquil blend of lavender and sage to soothe the mind and nourish the body. Benefits: Promotes relaxation, Soothing floral scent, Antibacterial properties, Hydrating formula.',
	},
	{
		name: 'Wild Rose & Rosehip',
		price: 24.0,
		category: 'Hydrating & Anti-Aging',
		image: 'soap-2.png',
		isBestSeller: true,
		description:
			'Luxurious rosehip oil and wild rose petals provide intense hydration and skin rejuvenation. Benefits: High in Vitamin C, Reduces appearance of wrinkles, Evens skin tone, Gentle for dry skin.',
	},
	{
		name: 'Cedar & Sea Salt',
		price: 18.0,
		category: 'Exfoliating & Refreshing',
		image: 'soap-3.png',
		isBestSeller: false,
		description:
			'Invigorating sea salt provides gentle exfoliation while the scent of cedar refreshes the soul. Benefits: Removes dead skin cells, Improves circulation, Fresh woodsy scent, Natural minerals.',
	},
];

async function main() {
	console.log('Clearing existing products...');
	await prisma.product.deleteMany();
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
