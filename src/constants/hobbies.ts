export const CATEGORIES = {
  sports: '운동형',
  intelligence: '지능형',
  arts: '예술형',
} as const;

export type CategoryType = keyof typeof CATEGORIES;

export const CATEGORY_DESCRIPTIONS: Record<CategoryType, string> = {
  sports: '몸을 움직이며 건강과 활력을 얻는 취미',
  intelligence: '사고력과 창의성을 키우는 지적 활동',
  arts: '예술적 감각과 표현력을 발휘하는 창작 활동',
};

export interface Hobby {
  id: string;
  name: string;
  category: CategoryType;
  imageUrl: string;
}

export const HOBBIES: Hobby[] = [
  {
    id: 'sports-1',
    name: '조깅/러닝',
    category: 'sports',
    imageUrl: '/thumbnails/running.jpg',
  },
  {
    id: 'sports-2',
    name: '요가',
    category: 'sports',
    imageUrl: '/thumbnails/yoga.jpg',
  },
  {
    id: 'sports-3',
    name: '수영',
    category: 'sports',
    imageUrl: '/thumbnails/swimming.jpg',
  },
  {
    id: 'sports-4',
    name: '자전거',
    category: 'sports',
    imageUrl: '/thumbnails/cycling.jpg',
  },
  {
    id: 'sports-5',
    name: '클라이밍',
    category: 'sports',
    imageUrl: '/thumbnails/climbing.jpg',
  },
  {
    id: 'sports-6',
    name: '댄스',
    category: 'sports',
    imageUrl: '/thumbnails/dance.jpg',
  },
  {
    id: 'intelligence-1',
    name: '독서',
    category: 'intelligence',
    imageUrl: '/thumbnails/reading.jpg',
  },
  {
    id: 'intelligence-2',
    name: '퍼즐',
    category: 'intelligence',
    imageUrl: '/thumbnails/puzzle.jpg',
  },
  {
    id: 'intelligence-3',
    name: '체스',
    category: 'intelligence',
    imageUrl: '/thumbnails/chess.jpg',
  },
  {
    id: 'intelligence-4',
    name: '프로그래밍',
    category: 'intelligence',
    imageUrl: '/thumbnails/programming.jpg',
  },
  {
    id: 'intelligence-5',
    name: '외국어 학습',
    category: 'intelligence',
    imageUrl: '/thumbnails/foreign_language_learning.jpg',
  },
  {
    id: 'intelligence-6',
    name: '사진 촬영',
    category: 'intelligence',
    imageUrl: '/thumbnails/photography.jpg',
  },
  {
    id: 'arts-1',
    name: '그림 그리기',
    category: 'arts',
    imageUrl: '/thumbnails/drawing.jpg',
  },
  {
    id: 'arts-2',
    name: '악기 연주',
    category: 'arts',
    imageUrl: '/thumbnails/instrument_playing.jpg',
  },
  {
    id: 'arts-3',
    name: '요리',
    category: 'arts',
    imageUrl: '/thumbnails/cooking.jpg',
  },
  {
    id: 'arts-4',
    name: '서예',
    category: 'arts',
    imageUrl: '/thumbnails/calligraphy.jpg',
  },
  {
    id: 'arts-5',
    name: '도자기 만들기',
    category: 'arts',
    imageUrl: '/thumbnails/pottery.jpg',
  },
  {
    id: 'arts-6',
    name: '정원 가꾸기',
    category: 'arts',
    imageUrl: '/thumbnails/gardening.jpg',
  },
];

export const getHobbiesByCategory = (category?: CategoryType): Hobby[] => {
  if (!category) return HOBBIES;
  return HOBBIES.filter((hobby) => hobby.category === category);
};

