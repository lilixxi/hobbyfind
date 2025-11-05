import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import { AuthProvider } from '@/components/auth/auth-provider';
import { TopBar } from '@/components/layout/top-bar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HobbyFind - 나에게 맞는 취미를 찾아보세요',
  description:
    '운동형, 지능형, 예술형 카테고리로 분류된 취미를 탐색하고 북마크하여 관리하세요.',
  keywords: ['취미', '취미 찾기', '북마크', '운동', '지능', '예술'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <TopBar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
