'use client';

import Link from 'next/link';
import { CATEGORIES, type CategoryType } from '@/constants/hobbies';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  activeCategory?: CategoryType | 'all';
}

export function CategoryFilter({ activeCategory = 'all' }: CategoryFilterProps) {
  return (
    <div className="flex justify-center gap-3 mt-6">
      <Link
        href="/"
        className={cn(
          'px-5 py-2 rounded-full border border-gray-200 transition-all',
          'hover:bg-gray-100',
          activeCategory === 'all'
            ? 'bg-brand-primary text-white border-brand-primary'
            : 'bg-white text-gray-900'
        )}
      >
        전체
      </Link>
      {Object.entries(CATEGORIES).map(([key, label]) => (
        <Link
          key={key}
          href={`/category/${key}`}
          className={cn(
            'px-5 py-2 rounded-full border border-gray-200 transition-all',
            'hover:bg-gray-100',
            activeCategory === key
              ? 'bg-brand-primary text-white border-brand-primary'
              : 'bg-white text-gray-900'
          )}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

