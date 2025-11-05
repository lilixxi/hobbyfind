'use client';

import { type Hobby } from '@/constants/hobbies';
import { HobbyCard } from './hobby-card';

interface HobbyCardGridProps {
  hobbies: Hobby[];
  bookmarkedIds?: string[];
  onToggleBookmark?: (hobbyId: string) => void;
}

export function HobbyCardGrid({
  hobbies,
  bookmarkedIds = [],
  onToggleBookmark,
}: HobbyCardGridProps) {
  if (hobbies.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">취미가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {hobbies.map((hobby) => (
        <HobbyCard
          key={hobby.id}
          hobby={hobby}
          isBookmarked={bookmarkedIds.includes(hobby.id)}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
}

