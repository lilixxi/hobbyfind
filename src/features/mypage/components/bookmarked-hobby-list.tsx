'use client';

import { type Hobby } from '@/constants/hobbies';
import { HobbyCard } from '@/features/home/components/hobby-card';
import { motion } from 'framer-motion';

interface BookmarkedHobbyListProps {
  hobbies: Hobby[];
  onToggleBookmark: (hobbyId: string) => void;
}

export function BookmarkedHobbyList({
  hobbies,
  onToggleBookmark,
}: BookmarkedHobbyListProps) {
  if (hobbies.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 bg-gray-50 rounded-xl"
      >
        <p className="text-xl text-gray-900 font-semibold mb-2">
          저장된 취미가 없습니다
        </p>
        <p className="text-gray-500">
          홈페이지에서 마음에 드는 취미를 북마크해보세요!
        </p>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          북마크한 취미
        </h2>
        <span className="text-sm text-gray-500">총 {hobbies.length}개</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={hobby.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <HobbyCard
              hobby={hobby}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

