'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CATEGORIES, type CategoryType } from '@/constants/hobbies';
import { useSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function TopBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const hideCategories = pathname === '/signup' || pathname === '/login';

  useEffect(() => {
    console.log('🔍 Session status:', status);
    console.log('🔍 Session data:', session);
  }, [session, status]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-xl font-semibold text-brand-primary">
            HobbyFind
          </Link>

          {!hideCategories && (
            <nav className="hidden md:flex items-center gap-6">
              {Object.entries(CATEGORIES).map(([key, label]) => (
                <Link
                  key={key}
                  href={`/category/${key}`}
                  className="text-gray-900 hover:text-brand-primary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-900 hover:text-brand-primary"
                >
                  <Link href="/mypage">마이페이지</Link>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-gray-900 hover:text-brand-primary"
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant="ghost"
                  className="text-gray-900 hover:text-brand-primary"
                >
                  <Link href="/login">로그인</Link>
                </Button>
                <Button
                  asChild
                  className="bg-brand-primary hover:bg-brand-accent text-white"
                >
                  <Link href="/signup">회원가입</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {!hideCategories && (
          <nav className="md:hidden flex items-center gap-4 pb-3 overflow-x-auto">
            {Object.entries(CATEGORIES).map(([key, label]) => (
              <Link
                key={key}
                href={`/category/${key}`}
                className="text-sm text-gray-900 hover:text-brand-primary whitespace-nowrap transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

