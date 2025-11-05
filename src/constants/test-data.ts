import { CategoryType } from './hobbies';

export interface TestOption {
  text: string;
  type: CategoryType;
}

export interface TestQuestion {
  id: number;
  question: string;
  options: TestOption[];
}

export interface TestResult {
  type: CategoryType;
  title: string;
  description: string;
  recommendedHobbies: string[];
  tags: string[];
  recommendedTopics: string[];
}

export interface TestInfo {
  title: string;
  description: string;
  categoryTypes: string[];
  totalQuestions: number;
}

export const TEST_INFO: TestInfo = {
  title: '나에게 맞는 취미 유형 테스트',
  description: '지금의 나에게 가장 어울리는 취미는 어떤 유형일까요? 간단한 질문 6개로 알아보세요!',
  categoryTypes: ['운동형', '지능형', '예술형'],
  totalQuestions: 6,
};

export const TEST_QUESTIONS: TestQuestion[] = [
  {
    id: 1,
    question: '주말 아침, 알람이 울릴 때 당신의 반응은?',
    options: [
      { text: '바로 일어나서 밖으로 나가고 싶다!', type: 'sports' },
      { text: '조용히 커피 한 잔 하며 책을 펼친다.', type: 'intelligence' },
      { text: '음악을 틀고 분위기 있게 하루를 시작한다.', type: 'arts' },
    ],
  },
  {
    id: 2,
    question: '스트레스를 받을 때 당신의 해소법은?',
    options: [
      { text: '땀 흘리며 운동하기!', type: 'sports' },
      { text: '논리적으로 원인을 분석하고 정리하기', type: 'intelligence' },
      { text: '그림 그리거나 음악 들으며 감정 풀기', type: 'arts' },
    ],
  },
  {
    id: 3,
    question: '새로운 사람들과 만났을 때 당신은?',
    options: [
      { text: '에너지 넘치게 대화하고 금방 친해진다.', type: 'sports' },
      { text: '관찰하면서 천천히 상대를 파악한다.', type: 'intelligence' },
      { text: '분위기를 살리며 감정적으로 교류한다.', type: 'arts' },
    ],
  },
  {
    id: 4,
    question: '무언가를 배울 때 당신의 스타일은?',
    options: [
      { text: '직접 몸으로 부딪히며 배우는 스타일', type: 'sports' },
      { text: '이론부터 확실히 이해해야 마음이 놓임', type: 'intelligence' },
      { text: '감각적으로 익히며 나만의 스타일을 만든다.', type: 'arts' },
    ],
  },
  {
    id: 5,
    question: '시간이 생겼을 때 가장 하고 싶은 것은?',
    options: [
      { text: '밖에 나가서 새로운 활동 시도!', type: 'sports' },
      { text: '혼자 집중해서 배우고 싶던 걸 공부', type: 'intelligence' },
      { text: '창의적인 무언가를 만들어보기', type: 'arts' },
    ],
  },
  {
    id: 6,
    question: '당신이 가장 중요하게 생각하는 것은?',
    options: [
      { text: '에너지와 건강!', type: 'sports' },
      { text: '지식과 성장!', type: 'intelligence' },
      { text: '감정과 표현!', type: 'arts' },
    ],
  },
];

export const TEST_RESULTS: Record<CategoryType, TestResult> = {
  sports: {
    type: 'sports',
    title: '에너지 충만한 액티브 탐험가 💪',
    description: '당신은 몸으로 세상을 느끼는 \'액티브형\'이에요! 도전과 땀을 통해 성취감을 느끼며, 팀워크와 리듬을 즐깁니다.',
    recommendedHobbies: ['조깅/러닝', '요가', '수영', '자전거', '클라이밍', '댄스'],
    tags: ['활동적', '도전적', '리더십', '에너지'],
    recommendedTopics: [
      '최근에 운동으로 힐링한 경험이 있나요?',
      '혼자 하는 운동 vs 함께 하는 운동, 어떤 게 좋아요?',
      '당신이 가장 좋아하는 운동 음악은?',
    ],
  },
  intelligence: {
    type: 'intelligence',
    title: '논리적이고 사색적인 마인드 워커 🧠',
    description: '당신은 지적 자극을 즐기는 \'탐구형\'이에요! 새로운 것을 배우는 걸 좋아하고, 문제를 해결하며 몰입을 느낍니다.',
    recommendedHobbies: ['독서', '퍼즐', '체스', '프로그래밍', '외국어 학습', '사진 촬영'],
    tags: ['집중력', '분석적', '지적호기심', '논리적사고'],
    recommendedTopics: [
      '최근에 읽은 책 중 가장 인상 깊은 문장은?',
      '문제를 풀 때 아이디어가 번뜩인 경험이 있나요?',
      '새로운 언어나 기술을 배우고 싶은 이유는?',
    ],
  },
  arts: {
    type: 'arts',
    title: '감성 풍부한 크리에이티브 드리머 🎨',
    description: '당신은 감각과 표현으로 세상을 바라보는 \'예술가형\'이에요! 창의적이고 감정적인 면이 강하며, 자신만의 세계를 즐깁니다.',
    recommendedHobbies: ['그림 그리기', '악기 연주', '요리', '서예', '도자기 만들기', '정원 가꾸기'],
    tags: ['감성적', '창의적', '표현력', '직관적'],
    recommendedTopics: [
      '당신에게 예술이란 어떤 의미인가요?',
      '요즘 가장 감동받은 작품은 무엇인가요?',
      '감정이 차오를 때, 어떤 방식으로 표현하나요?',
    ],
  },
};

