'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 HobbyFind. Made for Learning Project.
          </p>
          
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/terms"
              className="text-gray-600 hover:text-brand-primary transition-colors"
            >
              서비스 이용약관
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-brand-primary transition-colors"
            >
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

