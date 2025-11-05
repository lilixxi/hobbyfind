import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth-utils';
import { z } from 'zod';

const signUpSchema = z.object({
  email: z.string().email('유효한 이메일을 입력해주세요.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(100, '비밀번호는 100자를 초과할 수 없습니다.')
    .regex(/[A-Z]/, '비밀번호에 대문자를 1개 이상 포함해야 합니다.')
    .regex(/[a-z]/, '비밀번호에 소문자를 포함해야 합니다.')
    .regex(/[0-9]/, '비밀번호에 숫자를 포함해야 합니다.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호에 특수문자를 포함해야 합니다.'),
  name: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = signUpSchema.parse(body);

    const user = await createUser({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name,
    });

    if (!user) {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다.' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: '회원가입이 완료되었습니다.',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Signup error:', error);
    return NextResponse.json(
      { error: '회원가입 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

