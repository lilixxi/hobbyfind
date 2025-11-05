'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { HeroSection } from '@/features/home/components/hero-section';
import { CategoryFilter } from '@/features/home/components/category-filter';
import { HobbyCardGrid } from '@/features/home/components/hobby-card-grid';
import { HOBBIES } from '@/constants/hobbies';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      fetchBookmarks();
    }
  }, [session]);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (!response.ok) return;
      
      const data = await response.json();
      setBookmarkedIds(data.bookmarks || []);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const handleToggleBookmark = async (hobbyId: string) => {
    if (!session) {
      return;
    }

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

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CategoryFilter activeCategory="all" />
      <HobbyCardGrid
        hobbies={HOBBIES}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}
