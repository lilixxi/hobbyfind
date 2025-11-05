'use client';

import { motion } from 'framer-motion';
import { User, Mail, Calendar, Heart } from 'lucide-react';

interface UserProfileProps {
  name?: string | null;
  email?: string | null;
  bookmarkCount: number;
}

export function UserProfile({ name, email, bookmarkCount }: UserProfileProps) {
  const displayName = name || email?.split('@')[0] || '사용자';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow p-6"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">내 정보</h2>

      <div className="space-y-4">
        {/* 프로필 아이콘 */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{displayName}</h3>
            <p className="text-sm text-gray-500">HobbyFind 회원</p>
          </div>
        </div>

        {/* 정보 카드 */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          {email && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">이메일</p>
                <p className="text-sm text-gray-900 font-medium">{email}</p>
              </div>
            </div>
          )}

          {name && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">이름</p>
                <p className="text-sm text-gray-900 font-medium">{name}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-3 bg-brand-light rounded-lg">
            <Heart className="w-5 h-5 text-brand-primary" />
            <div>
              <p className="text-xs text-gray-500">북마크한 취미</p>
              <p className="text-sm text-gray-900 font-medium">{bookmarkCount}개</p>
            </div>
          </div>
        </div>

        {/* 활동 요약 */}
        <div className="pt-4 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-brand-primary">{bookmarkCount}</p>
              <p className="text-xs text-gray-500 mt-1">저장한 취미</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-success">
                {bookmarkCount > 0 ? '활동중' : '시작'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {bookmarkCount > 0 ? '활발히 탐색중' : '취미 탐색하기'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

