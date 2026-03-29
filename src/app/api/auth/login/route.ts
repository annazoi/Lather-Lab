import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/validators/auth.schema';
import { authService } from '@/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const validatedData = await loginSchema.validate(body, { abortEarly: false });
    
    const { user, token } = await authService.loginUser(validatedData);

    const response = NextResponse.json({ user, token }, { status: 200 });
    
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return response;
  } catch (error: any) {
    console.error('[LOGIN_API_ERROR]:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: error.errors[0] }, { status: 400 });
    }

    return NextResponse.json({ error: error.message || 'Login failed' }, { status: 401 });
  }
}
