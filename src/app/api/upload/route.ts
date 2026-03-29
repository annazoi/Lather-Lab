import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const file = formData.get('file') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file provided' }, { status: 400 });
		}

		// Convert file to Buffer
		const buffer = Buffer.from(await file.arrayBuffer());

		// Upload to Cloudinary using a Promise since it's a stream-based upload or use buffer directly
		const uploadResponse = await new Promise((resolve, reject) => {
			cloudinary.uploader
				.upload_stream({ folder: 'lather-lab' }, (error: any, result: any) => {
					if (error) reject(error);
					else resolve(result);
				})
				.end(buffer);
		});

		const result = uploadResponse as any;

		return NextResponse.json(
			{
				secure_url: result.secure_url,
				public_id: result.public_id,
			},
			{ status: 200 },
		);
	} catch (error) {
		console.error('[UPLOAD_API_ERROR]:', error);
		return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
	}
}
