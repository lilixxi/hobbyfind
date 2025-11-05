'use client';

import { useMemo } from 'react';
import { CATEGORIES, type CategoryType } from '@/constants/hobbies';
import { motion } from 'framer-motion';

interface StatsChartProps {
  bookmarkedHobbies: Array<{ id: string; category: CategoryType }>;
}

const COLORS = {
  sports: '#FF385C',
  intelligence: '#00A699',
  arts: '#FFA500',
};

const CATEGORY_LABELS = {
  sports: '운동형',
  intelligence: '지능형',
  arts: '예술형',
};

export function StatsChart({ bookmarkedHobbies }: StatsChartProps) {
  const chartData = useMemo(() => {
    const categoryCounts: Record<CategoryType, number> = {
      sports: 0,
      intelligence: 0,
      arts: 0,
    };

    bookmarkedHobbies.forEach((hobby) => {
      categoryCounts[hobby.category]++;
    });

    const total = bookmarkedHobbies.length;

    return Object.entries(categoryCounts)
      .filter(([_, count]) => count > 0)
      .map(([category, count]) => ({
        category: category as CategoryType,
        name: CATEGORY_LABELS[category as CategoryType],
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
        color: COLORS[category as CategoryType],
      }));
  }, [bookmarkedHobbies]);

  const total = bookmarkedHobbies.length;

  if (total === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 bg-gray-50 rounded-xl"
      >
        <p className="text-gray-500">북마크한 취미가 없습니다.</p>
        <p className="text-sm text-gray-400 mt-2">
          취미를 탐색하고 북마크를 추가해보세요!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-xl shadow p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        카테고리별 북마크 분포
      </h2>

      <div className="space-y-6">
        {/* 총 북마크 수 */}
        <div className="text-center pb-4 border-b border-gray-200">
          <p className="text-4xl font-bold text-gray-900">{total}</p>
          <p className="text-sm text-gray-500 mt-1">총 북마크</p>
        </div>

        {/* 카테고리별 막대 그래프 */}
        <div className="space-y-4">
          {chartData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-900 font-medium">{item.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-semibold">
                    {item.count}개
                  </span>
                  <span className="text-gray-500 min-w-[45px] text-right">
                    {item.percentage.toFixed(0)}%
                  </span>
                </div>
              </div>
              
              {/* 프로그레스 바 */}
              <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + 0.1 * index, ease: 'easeOut' }}
                  className="h-full flex items-center justify-end px-3"
                  style={{ backgroundColor: item.color }}
                >
                  {item.percentage >= 15 && (
                    <span className="text-white text-sm font-bold">
                      {item.count}
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 도넛 차트 대신 간단한 카드 스타일 요약 */}
        <div className="grid grid-cols-3 gap-3 pt-4">
          {chartData.map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + 0.1 * index }}
              className="relative p-4 rounded-lg text-center overflow-hidden"
              style={{ 
                backgroundColor: `${item.color}15`,
                borderLeft: `4px solid ${item.color}`
              }}
            >
              <p className="text-2xl font-bold" style={{ color: item.color }}>
                {item.count}
              </p>
              <p className="text-xs text-gray-600 mt-1">{item.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
