import { NextRequest, NextResponse } from 'next/server';
import { registerSchema } from '@/validators/auth.schema';
import { authService } from '@/services/auth.service';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		// Validate with Yup
		const validatedData = await registerSchema.validate(body, { abortEarly: false });

		const { user, token } = await authService.registerUser(validatedData);

		const response = NextResponse.json({ user, token }, { status: 201 });

		// Set cookie for better Auth handling in production
		response.cookies.set('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 24 * 7, // 1 week
			path: '/',
		});

		return response;
	} catch (error: any) {
		console.error('[REGISTER_API_ERROR]:', error);

		if (error.name === 'ValidationError') {
			return NextResponse.json({ error: error.errors[0] }, { status: 400 });
		}

		return NextResponse.json({ error: error.message || 'Registration failed' }, { status: 400 });
	}
}
