'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Check, X, Eye, EyeOff } from 'lucide-react';

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  { label: '6자 이상', test: (pw) => pw.length >= 6 },
  { label: '대문자 포함', test: (pw) => /[A-Z]/.test(pw) },
  { label: '소문자 포함', test: (pw) => /[a-z]/.test(pw) },
  { label: '숫자 포함', test: (pw) => /[0-9]/.test(pw) },
  { label: '특수문자 포함 (!@#$%^&*)', test: (pw) => /[!@#$%^&*(),.?":{}|<>]/.test(pw) },
];

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
  });

  const passwordValidation = useMemo(() => {
    return PASSWORD_REQUIREMENTS.map((req) => ({
      ...req,
      isValid: req.test(formData.password),
    }));
  }, [formData.password]);

  const isPasswordValid = useMemo(() => {
    return passwordValidation.every((req) => req.isValid);
  }, [passwordValidation]);

  const passwordsMatch = useMemo(() => {
    if (!formData.passwordConfirm) return null;
    return formData.password === formData.passwordConfirm;
  }, [formData.password, formData.passwordConfirm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedToTerms || !agreedToPrivacy) {
      toast({
        title: '약관 동의 필요',
        description: '서비스 이용약관 및 개인정보처리방침에 모두 동의해주세요.',
        variant: 'destructive',
      });
      return;
    }

    if (!isPasswordValid) {
      toast({
        title: '비밀번호 조건 미충족',
        description: '모든 비밀번호 조건을 충족해주세요.',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      toast({
        title: '비밀번호 불일치',
        description: '비밀번호가 일치하지 않습니다.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast({
          title: '회원가입 실패',
          description: data.error || '회원가입에 실패했습니다.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: '회원가입 성공',
        description: '로그인 페이지로 이동합니다.',
      });

      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } catch (error) {
      toast({
        title: '오류 발생',
        description: '회원가입 중 문제가 발생했습니다.',
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
        회원가입
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
          <Label htmlFor="name" className="text-gray-900">
            이름 (선택)
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-primary focus:outline-none mt-1"
            placeholder="홍길동"
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
          
          {formData.password && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 space-y-1 overflow-hidden"
            >
              {passwordValidation.map((req, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs"
                >
                  {req.isValid ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span
                    className={
                      req.isValid ? 'text-success' : 'text-gray-500'
                    }
                  >
                    {req.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="!mt-3">
          <Label htmlFor="passwordConfirm" className="text-gray-900">
            비밀번호 확인
          </Label>
          <div className="relative">
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type={showPasswordConfirm ? 'text' : 'password'}
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full border-gray-300 rounded-lg p-3 pr-10 focus:ring-2 focus:ring-brand-primary focus:outline-none mt-1"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 mt-0.5"
              disabled={isLoading}
            >
              {showPasswordConfirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {formData.passwordConfirm && passwordsMatch !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-2 overflow-hidden"
            >
              <div className="flex items-center gap-2 text-xs">
                {passwordsMatch ? (
                  <>
                    <Check className="w-4 h-4 text-success" />
                    <span className="text-success">비밀번호가 일치합니다</span>
                  </>
                ) : (
                  <>
                    <X className="w-4 h-4 text-red-500" />
                    <span className="text-red-500">비밀번호가 일치하지 않습니다</span>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-gray-200">
          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="accent-brand-primary mt-0.5"
            />
            <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
              <Link
                href="/terms"
                target="_blank"
                className="text-brand-primary hover:text-brand-accent underline font-medium"
              >
                서비스 이용약관
              </Link>
              에 동의합니다 (필수)
            </Label>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600">
            <Checkbox
              id="privacy"
              checked={agreedToPrivacy}
              onCheckedChange={(checked) => setAgreedToPrivacy(checked as boolean)}
              className="accent-brand-primary mt-0.5"
            />
            <Label htmlFor="privacy" className="cursor-pointer leading-relaxed">
              <Link
                href="/privacy"
                target="_blank"
                className="text-brand-primary hover:text-brand-accent underline font-medium"
              >
                개인정보처리방침
              </Link>
              에 동의합니다 (필수)
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand-primary text-white py-3 rounded-lg hover:bg-brand-accent transition-colors"
        >
          {isLoading ? '회원가입 중...' : '회원가입'}
        </Button>
      </form>

      <div className="text-center text-gray-500 text-sm mt-4">
        이미 계정이 있으신가요?{' '}
        <Link
          href="/login"
          className="text-brand-primary hover:text-brand-accent font-medium"
        >
          로그인
        </Link>
      </div>
    </motion.div>
  );
}

