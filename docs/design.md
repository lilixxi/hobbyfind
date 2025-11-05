⸻

🎨 HobbyFind – Web Design Guide (Airbnb Style Reference)

⸻

1. 🌈 디자인 시스템 개요 (Design System Overview)

항목	내용
브랜드 아이덴티티	“나에게 맞는 취미를 탐색하고 저장하는 즐거움”→ 따뜻하고 부드러운 감성 중심 UX, Airbnb의 “여행처럼 설레는 경험” 톤앤매너 차용
UI 톤앤매너 (Tone & Manner)	미니멀, 직관, 감성 중심. 불필요한 장식 없이 콘텐츠 중심으로 시선을 유도.
비주얼 키워드	여백 중심(Layout Space), 라운드형(Card Rounded), 그림자(Soft Shadow), 부드러운 전환(Transition Ease-in-out)
폰트 스타일	Airbnb Cereal / Inter / Noto Sans KR (대체용)font-sans text-gray-800 leading-relaxed
레이아웃 규칙	- 페이지 최대 폭: max-w-7xl mx-auto- 내부 여백: px-6 md:px-10 lg:px-16- 세로 간격: space-y-8


⸻

2. 🎨 TailwindCSS 색상 팔레트 (Color Palette for TailwindCSS)

구분	설명	색상 코드	Tailwind 예시
Brand Primary	브랜드 메인 컬러 (Airbnb Coral)	#FF385C	bg-[#FF385C], text-[#FF385C]
Brand Light	브랜드 라이트 배경용	#FFF2F4	bg-[#FFF2F4]
Accent / Hover	버튼 Hover, 포인트	#E31C5F	hover:bg-[#E31C5F]
Background Base	전체 페이지 배경	#FFFFFF	bg-white
Background Subtle	Hero, 구분 섹션용	#F7F7F7	bg-gray-50
Text Primary	주요 텍스트	#222222	text-gray-900
Text Secondary	보조 텍스트	#717171	text-gray-500
Border / Divider	경계선, 카드 구분선	#EBEBEB	border-gray-200
Success / Active	북마크 활성 상태	#00A699	text-[#00A699]

✅ 디자인 원칙:
	•	밝고 부드러운 중립톤을 기본으로, 포인트는 한정적으로 Coral (#FF385C) 사용
	•	Hover/Active 시 대비를 높여 상호작용 피드백을 명확히 전달

⸻

3. 📄 페이지 구현 가이드 (Page Implementations)

🏠 홈 페이지 (/)

영역	구성 요소	TailwindCSS 예시
Top Bar	로고 / 카테고리 메뉴 / 로그인·회원가입 버튼	flex justify-between items-center px-8 py-4 border-b border-gray-200 bg-white sticky top-0 z-50
Hero 섹션	“나에게 맞는 취미를 찾아보세요” 문구, 중립톤 배경	text-center py-20 bg-gray-50 text-3xl font-semibold text-gray-800
카테고리 필터	세 개의 필터 버튼 (운동형/지능형/예술형)	flex justify-center gap-3 mt-4px-5 py-2 rounded-full border hover:bg-gray-100 active:bg-[#FF385C] active:text-white
취미 카드 그리드	전체 취미 카드 표시	grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6


⸻

🧘 카테고리 페이지 (/category/[type])

영역	구성 요소	TailwindCSS 예시
카테고리 헤더	카테고리명 + 간단한 문구	text-center py-10 text-2xl font-semibold text-gray-800
취미 카드 그리드	선택된 카테고리의 취미만 표시	grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-6
북마크 버튼 (회원만)	하트 토글	absolute top-3 right-3 text-gray-400 hover:text-[#FF385C]


⸻

🔐 로그인 페이지 (/login)

구성 요소	TailwindCSS 예시
로그인 박스	max-w-md mx-auto mt-20 p-8 bg-white shadow-md rounded-xl
폼 필드	w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#FF385C]
버튼	w-full bg-[#FF385C] text-white py-3 rounded-lg hover:bg-[#E31C5F]
하단 링크	text-center text-gray-500 text-sm mt-4


⸻

📝 회원가입 페이지 (/signup)
	•	로그인 페이지와 동일한 폼 스타일, 약관 동의 체크박스 추가
	•	체크박스 예시:

<label class="flex items-center gap-2 text-sm text-gray-600">
  <input type="checkbox" class="accent-[#FF385C]" /> 약관에 동의합니다
</label>



⸻

❤️ 마이페이지 (/mypage)

섹션	구성 요소	TailwindCSS 예시
북마크 리스트	저장된 취미 카드	동일한 <HobbyCard /> 컴포넌트 재사용
통계 차트	카테고리별 북마크 분포	Chart.js 기반 PieChart / BarChart, 섹션 여백 py-8
북마크 해제 버튼	북마크 클릭 시 제거	Hover 시 scale-[1.05] 효과


⸻

4. 🧱 레이아웃 컴포넌트 (Layout Components)

컴포넌트	역할	TailwindCSS 구조 예시
Header (TopBar)	전역 내비게이션 (로고 + 메뉴 + 인증 상태별 버튼)	flex justify-between items-center border-b px-8 py-4 bg-white sticky top-0
Footer	간단한 저작권 문구	text-center text-gray-400 py-6 border-t
Card	이미지 + 취미명 + 북마크 버튼	html <div class="relative rounded-xl overflow-hidden shadow hover:shadow-lg bg-white transition"> <img class="h-40 w-full object-cover" /> <div class="p-4"><h3 class="font-semibold text-lg">요가</h3><p class="text-sm text-gray-500">운동형</p></div></div>
CategoryFilter	상단 필터 버튼 세트	flex justify-center gap-4 mt-6
StatsChart	마이페이지 내 통계 시각화	<canvas class="w-full h-64"></canvas> or <BarChart />


⸻

5. ⚙️ 상호작용 패턴 (Interaction Patterns)

인터랙션	설명	시각 효과 (Tailwind 예시)
카드 Hover	마우스 오버 시 그림자 확대	hover:shadow-lg hover:scale-[1.02] transition-transform duration-200
북마크 토글	클릭 시 하트 색상 전환	text-gray-400 hover:text-[#FF385C] active:scale-110 transition
버튼 Hover	배경색 강조	hover:bg-[#E31C5F] hover:shadow-md
페이지 전환	페이드 인 효과	motion.div or transition-opacity duration-300
모바일 탭 피드백	클릭 시 밝은 배경 플래시	active:bg-gray-100
폼 포커스	입력 필드 강조	focus:ring-2 focus:ring-[#FF385C] focus:outline-none


⸻

6. 📱 반응형 브레이크포인트 (Responsive Breakpoints)

구분	Tailwind 기준	주요 변화
sm (≤640px)	모바일	2열 그리드, Hero 폰트 text-xl, 버튼 크기 축소
md (641~768px)	태블릿	3열 그리드, Hero text-2xl, 내부 여백 확대
lg (769~1024px)	데스크톱	4열 그리드, 여백 px-12
xl (1025~1280px)	와이드	최대폭 max-w-7xl, 콘텐츠 중앙 정렬
2xl (≥1536px)	초대형 화면	여백 강화, 카드 간격 gap-8 확대

공통 규칙
	•	레이아웃은 그리드 중심 (grid-cols-2~4)
	•	Hero 섹션은 항상 중앙 정렬(text-center flex flex-col items-center justify-center)
	•	TopBar는 항상 고정(sticky top-0)

⸻

7. ✨ 핵심 비주얼 예시 (Visual Mockup Code)

<section class="text-center py-16 bg-gray-50">
  <h1 class="text-3xl font-semibold text-gray-800 mb-3">
    나에게 맞는 취미를 찾아보세요
  </h1>
  <p class="text-gray-500">운동형, 지능형, 예술형 중에서 선택하세요</p>
</section>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
  <div class="relative rounded-xl overflow-hidden shadow bg-white hover:shadow-lg transition">
    <img src="/images/yoga.jpg" alt="요가" class="h-40 w-full object-cover" />
    <button class="absolute top-3 right-3 text-gray-400 hover:text-[#FF385C]">
      ♥
    </button>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800">요가</h3>
      <p class="text-sm text-gray-500">운동형</p>
    </div>
  </div>
</div>


⸻

8. 🧭 Airbnb 스타일 요약 원칙

항목	Airbnb 스타일 반영 포인트
색감	따뜻한 Coral 계열 중심, 흰색·회색 대비로 부드러움 강조
여백 (Spacing)	요소 간 충분한 공백 (p-6, gap-6) 유지
타이포그래피	명료하고 따뜻한 Sans-serif, 세로 간격(leading-relaxed) 확보
카드 디자인	라운드 + 그림자 + 미묘한 Hover Scale
인터랙션	즉각적이지만 과하지 않은 Motion (Ease-in-out, Fade)
감성 톤	“편안하게 탐색하고 싶은” 감각적 UI (Airbnb 핵심 감성 모티프)


⸻

9. 📋 종합 요약

항목	내용
서비스명	HobbyFind
디자인 레퍼런스	Airbnb Design System
UI 구조	TopBar / Hero / CardGrid / Footer
컬러 핵심	Coral (#FF385C), Warm White, Neutral Gray
주요 컴포넌트	HobbyCard, BookmarkButton, CategoryFilter, StatsChart
UX 포인트	북마크 시각 피드백 / 감성형 여백 / 카드 Hover Motion
기술 스택	Next.js + TailwindCSS + Framer Motion + Chart.js
스타일 방향	감성적·여백 중심·직관적 사용자 여정 중심 디자인


⸻