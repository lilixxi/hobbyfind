'use client';

import Image from 'next/image';
import { type Hobby, CATEGORIES } from '@/constants/hobbies';
import { BookmarkButton } from './bookmark-button';

interface HobbyCardProps {
  hobby: Hobby;
  isBookmarked?: boolean;
  onToggleBookmark?: (hobbyId: string) => void;
}

export function HobbyCard({
  hobby,
  isBookmarked = false,
  onToggleBookmark,
}: HobbyCardProps) {
  return (
    <div className="relative rounded-xl overflow-hidden shadow bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
      <div className="relative h-40 w-full">
        <Image
          src={hobby.imageUrl}
          alt={hobby.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
        />
      </div>

      <BookmarkButton
        hobbyId={hobby.id}
        isBookmarked={isBookmarked}
        onToggle={onToggleBookmark}
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{hobby.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{CATEGORIES[hobby.category]}</p>
      </div>
    </div>
  );
}

