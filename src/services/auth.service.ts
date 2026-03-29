import bcrypt from 'bcryptjs';
import { userRepository } from '@/repositories/user.repository';
import { RegisterData, LoginData } from '@/validators/auth.schema';
import { signToken } from '@/lib/jwt';
import { User } from '@prisma/client';

export class AuthService {
  async registerUser(data: RegisterData) {
    const existingUser = await userRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    // Convert register data to Prisma input (handling nullable types/validation)
    const userInput = {
      email: data.email,
      password: hashedPassword,
      role: (data.role as any) || 'CLIENT', // Casting because of schema-types mismatch vs prisma model enum
    };

    const user = await userRepository.createUser(userInput);
    
    // We return user without password
    const { password, ...userWithoutPassword } = user;
    
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: userWithoutPassword, token };
  }

  async loginUser(data: LoginData) {
    const user = await userRepository.findUserByEmail(data.email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      throw new Error('Invalid email or password');
    }

    const { password, ...userWithoutPassword } = user;
    
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user: userWithoutPassword, token };
  }
}

export const authService = new AuthService();
