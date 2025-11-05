'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CategoryHeader } from '@/features/category/components/category-header';
import { CategoryFilter } from '@/features/home/components/category-filter';
import { HobbyCardGrid } from '@/features/home/components/hobby-card-grid';
import { getHobbiesByCategory, type CategoryType } from '@/constants/hobbies';
import { notFound } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const VALID_CATEGORIES: CategoryType[] = ['sports', 'intelligence', 'arts'];

export default function CategoryPage() {
  const params = useParams();
  const type = params.type as string;
  const { data: session } = useSession();
  const { toast } = useToast();
  
  if (!VALID_CATEGORIES.includes(type as CategoryType)) {
    notFound();
  }

  const category = type as CategoryType;
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const hobbies = getHobbiesByCategory(category);

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
      <CategoryHeader category={category} />
      <CategoryFilter activeCategory={category} />
      <HobbyCardGrid
        hobbies={hobbies}
        bookmarkedIds={bookmarkedIds}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
}

