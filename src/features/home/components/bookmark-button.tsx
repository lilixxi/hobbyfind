'use client';

import { Heart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookmarkButtonProps {
  hobbyId: string;
  isBookmarked?: boolean;
  onToggle?: (hobbyId: string) => void;
}

export function BookmarkButton({
  hobbyId,
  isBookmarked = false,
  onToggle,
}: BookmarkButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!session) {
      toast({
        title: '로그인이 필요합니다',
        description: '로그인 후 이용 가능합니다.',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    onToggle?.(hobbyId);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        'absolute top-3 right-3 p-2 rounded-full transition-all',
        'hover:scale-110 active:scale-95',
        isBookmarked
          ? 'text-success bg-white/90'
          : 'text-gray-400 bg-white/90 hover:text-brand-primary'
      )}
      aria-label={isBookmarked ? '북마크 해제' : '북마크 추가'}
    >
      <Heart
        className={cn('w-5 h-5', isBookmarked && 'fill-current')}
      />
    </button>
  );
}

