import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load .env.local for Next.js users
dotenv.config({ path: join(process.cwd(), '.env.local') });

export default defineConfig({
	datasource: {
		url: process.env.DATABASE_URL,
	},
});
