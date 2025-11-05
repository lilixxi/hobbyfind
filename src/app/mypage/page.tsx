'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { BookmarkedHobbyList } from '@/features/mypage/components/bookmarked-hobby-list';
import { StatsChart } from '@/features/mypage/components/stats-chart';
import { UserProfile } from '@/features/mypage/components/user-profile';
import { HOBBIES, type Hobby } from '@/constants/hobbies';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

export default function MyPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast({
        title: '로그인이 필요합니다',
        description: '마이페이지는 로그인 후 이용 가능합니다.',
        variant: 'destructive',
      });
      router.push('/login');
    }
  }, [status, router, toast]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchBookmarks();
    }
  }, [session]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (!response.ok) throw new Error('Failed to fetch bookmarks');
      
      const data = await response.json();
      setBookmarkedIds(data.bookmarks || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast({
        title: '북마크 로드 실패',
        description: '북마크를 불러오는데 실패했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBookmark = async (hobbyId: string) => {
    const isCurrentlyBookmarked = bookmarkedIds.includes(hobbyId);

    try {
      if (isCurrentlyBookmarked) {
        const response = await fetch(`/api/bookmarks?hobbyId=${hobbyId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to remove bookmark');

        setBookmarkedIds((prev) => prev.filter((id) => id !== hobbyId));
        toast({
          title: '북마크 해제',
          description: '북마크가 해제되었습니다.',
        });
      } else {
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hobbyId }),
        });

        if (!response.ok) throw new Error('Failed to add bookmark');

        setBookmarkedIds((prev) => [...prev, hobbyId]);
        toast({
          title: '북마크 추가',
          description: '북마크가 추가되었습니다.',
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast({
        title: '오류 발생',
        description: '북마크 처리 중 오류가 발생했습니다.',
        variant: 'destructive',
      });
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const bookmarkedHobbies = HOBBIES.filter((hobby) =>
    bookmarkedIds.includes(hobby.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            마이페이지
          </h1>
          <p className="text-gray-500">
            {session?.user?.name || session?.user?.email}님의 취미 관리
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽 사이드바: 사용자 정보 & 통계 */}
          <div className="lg:col-span-1 space-y-6">
            <UserProfile
              name={session?.user?.name}
              email={session?.user?.email}
              bookmarkCount={bookmarkedHobbies.length}
            />
            <StatsChart bookmarkedHobbies={bookmarkedHobbies} />
          </div>

          {/* 오른쪽: 북마크 목록 */}
          <div className="lg:col-span-2">
            <BookmarkedHobbyList
              hobbies={bookmarkedHobbies}
              onToggleBookmark={handleToggleBookmark}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

