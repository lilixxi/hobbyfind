'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: '로그인 실패',
          description: '아이디 또는 비밀번호가 올바르지 않습니다.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: '로그인 성공',
        description: '환영합니다!',
      });

      router.push('/');
      router.refresh();
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '로그인 중 문제가 발생했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto mt-20 p-8 bg-white shadow-md rounded-xl"
    >
      <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
        로그인
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-gray-900">
            이메일
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none mt-1"
            placeholder="example@email.com"
          />
        </div>

        <div>
          <Label htmlFor="password" className="text-gray-900">
            비밀번호
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-brand-primary focus:outline-none mt-1"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 mt-0.5"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-accent transition-colors"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-400">또는</span>
        </div>
      </div>

      <Button
        onClick={() => signIn('kakao', { callbackUrl: '/' })}
        variant="outline"
        className="w-full border-2 border-yellow-300 hover:bg-yellow-50 flex items-center justify-center gap-2 py-3"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="#181600"><path d="M12 3C6.48 3 2 6.477 2 10.77c0 2.86 2.02 5.355 5.04 6.73-.16.59-.58 2.13-.66 2.46-.1.41.15.81.57.58.3-.17 1.94-1.28 2.74-1.82.73.11 1.48.17 2.25.17 5.52 0 10-3.477 10-7.77C24 6.477 19.52 3 14 3h-2z"/></svg>
        카카오로 계속하기
      </Button>

      <div className="text-center text-gray-500 text-sm mt-4">
        계정이 없으신가요?{' '}
        <Link
          href="/signup"
          className="text-brand-primary hover:text-brand-accent font-medium"
        >
          회원가입
        </Link>
      </div>
    </motion.div>
  );
}

