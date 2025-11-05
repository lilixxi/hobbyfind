⸻

🧭 Information Architecture – HobbyFind

⸻

1. 🌐 전체 사이트맵 구조 (Site Map)

HobbyFind
│
├── [홈] (/)
│    ├── Top Bar
│    │    ├── Logo → 홈 이동
│    │    ├── Category Menu → /category/[type]
│    │    └── 로그인/회원가입 버튼 (비로그인 시)
│    │         └── 마이페이지/로그아웃 (로그인 시)
│    ├── Hero Section
│    └── HobbyCardGrid (전체 취미)
│
├── [카테고리 페이지] (/category/[type])
│    ├── CategoryHeader (카테고리명 + 소개문)
│    └── HobbyCardGrid (해당 카테고리 취미)
│
├── [로그인 페이지] (/login)
│    ├── 로그인 폼 (ID, PW)
│    ├── 로그인 버튼
│    ├── 에러 메시지
│    └── 회원가입 링크 (/signup)
│
├── [회원가입 페이지] (/signup)
│    ├── 회원가입 폼 (ID, PW)
│    ├── 약관 동의 체크박스
│    └── 로그인 링크 (/login)
│
└── [마이페이지] (/mypage)
     ├── 북마크 목록 (HobbyCardGrid)
     └── 북마크 통계 차트 (카테고리별 분포)


⸻

2. 👥 사용자 흐름 (User Flow)

🧾 비회원 흐름

[홈(/)] 
 ├── 카테고리 클릭 → /category/[type]
 ├── 로그인 버튼 → /login
 └── 회원가입 버튼 → /signup

행동 패턴 요약
	•	비회원은 취미 탐색만 가능
	•	북마크 버튼은 비활성화(tooltip: "로그인 후 이용 가능")
	•	로그인 버튼 클릭 시 /login 페이지로 이동

⸻

🔐 회원 흐름

[홈(/)] 
 ├── 카테고리 클릭 → /category/[type]
 ├── 취미 카드 북마크 클릭 → 북마크 추가
 ├── 마이페이지 버튼 → /mypage
 └── 로그아웃 클릭 → 세션 종료 후 홈(/) 리다이렉트

행동 패턴 요약
	•	회원은 북마크/마이페이지 기능 사용 가능
	•	로그아웃 시 localStorage 또는 Supabase 세션 삭제
	•	마이페이지에서 북마크 현황 및 통계 확인 가능

⸻

3. 🔗 내비게이션 구조 (Navigation Structure)

상태	Top Bar 표시 요소	동작
비로그인 상태	로고 / 카테고리 메뉴(운동형, 지능형, 예술형) / 로그인 / 회원가입	로그인 시 /login, 회원가입 시 /signup 이동
로그인 상태	로고 / 카테고리 메뉴 / 마이페이지 / 로그아웃	마이페이지 클릭 시 /mypage, 로그아웃 시 세션 종료 후 /

모든 페이지에서 Top Bar 고정(sticky top-0 z-50), 페이지 이동은 Next.js <Link> 기반

⸻

4. 🧱 페이지 계층 구조 (Page Hierarchy)

페이지	하위 섹션	설명
홈(/)	Top Bar / Hero Section / HobbyCardGrid	전체 취미 탐색, 비회원·회원 공통 진입점
카테고리(/category/[type])	CategoryHeader / HobbyCardGrid	선택된 카테고리의 취미만 표시
로그인(/login)	Form (ID, PW) / Error Message / Signup Link	로그인 인증 및 라우팅 처리
회원가입(/signup)	Form (ID, PW, 약관) / Login Link	신규 사용자 등록
마이페이지(/mypage)	북마크 리스트 / 통계 차트	로그인된 사용자의 저장 취미 및 카테고리별 시각화


⸻

5. 📄 페이지별 주요 콘텐츠 구성 (Content Organization)

페이지	핵심 콘텐츠	구성 요소
홈(/)	Hero 문구, 전체 취미 카드	HeroSection, HobbyCardGrid(all)
카테고리별 페이지(/category/[type])	카테고리명, 설명, 취미 카드	CategoryHeader, HobbyCardGrid(filtered)
로그인(/login)	로그인 폼, 오류 메시지	LoginForm, ErrorText, Link("/signup")
회원가입(/signup)	회원가입 폼, 약관	SignupForm, Checkbox, Link("/login")
마이페이지(/mypage)	북마크 리스트, 통계	BookmarkedHobbyList, StatsChart


⸻

6. 🔄 상호작용 패턴 (Interaction Patterns)

인터랙션	설명	상태 변화
카테고리 필터 클릭	/category/[type] 페이지로 이동	URL 변경, 해당 카테고리 콘텐츠 렌더링
북마크 토글 (로그인 시)	하트 아이콘 클릭 시 추가/삭제	isBookmarked 상태 토글
북마크 클릭 (비로그인 시)	비활성화 상태로 tooltip 표시	“로그인 후 이용 가능합니다”
로그인 실패	잘못된 정보 입력 시	에러 메시지 표시 (Invalid credentials)
로그인 성공	세션 저장, 홈(/)로 리다이렉트	Top Bar 상태 전환 (마이페이지/로그아웃 표시)
로그아웃	세션 삭제 후 홈(/) 리다이렉트	Top Bar 다시 로그인/회원가입으로 변경
마이페이지 접근 (비로그인)	/mypage 접근 시 차단	/login으로 자동 리다이렉트 (Protected Route)


⸻

7. 🌍 URL 구조 (URL Structure)

페이지	URL 예시	설명
홈	/	전체 취미 탐색
카테고리별 페이지	/category/sports/category/intelligence/category/arts	카테고리별 취미 탐색
로그인	/login	아이디/비밀번호 기반 로그인
회원가입	/signup	신규 계정 등록
마이페이지	/mypage	로그인 사용자 전용 북마크 관리


⸻

8. 🧩 컴포넌트 계층 구조 (Component Hierarchy)

App (Next.js Layout)
│
├── Layout
│    ├── <TopBar />  // 로고, 카테고리 메뉴, 로그인/마이페이지 버튼
│    └── <Footer />  // 기본 저작권 문구
│
├── Pages
│    ├── HomePage (/)  
│    │    ├── <HeroSection />
│    │    └── <HobbyCardGrid category="all" />
│    │
│    ├── CategoryPage (/category/[type])
│    │    ├── <CategoryHeader />
│    │    └── <HobbyCardGrid category="sports|intelligence|arts" />
│    │
│    ├── LoginPage (/login)
│    │    ├── <LoginForm />  
│    │    └── <ErrorText />  
│    │
│    ├── SignupPage (/signup)
│    │    └── <SignupForm />  
│    │
│    └── MyPage (/mypage)
│         ├── <BookmarkedHobbyList />  
│         └── <StatsChart />  
│
└── Reusable Components
     ├── <HobbyCard /> // 이미지, 이름, 카테고리, 북마크 버튼 포함
     ├── <BookmarkButton /> // 상태별 하트 토글
     ├── <CategoryMenu /> // 상단 카테고리 메뉴
     └── <AuthGuard /> // 로그인 보호 라우트


⸻

9. 🧭 상단바/하단바 구성 (Navigation Bars)

구분	구성 요소	설명
Top Bar (전 페이지 공통)	로고(홈 링크), 카테고리 메뉴(운동형/지능형/예술형), 로그인/회원가입(비회원 시), 마이페이지/로그아웃(회원 시)	상태 기반 렌더링 (session 여부에 따라 동적 표시)
Footer (선택적)	“© 2025 HobbyFind” 또는 “Made for Learning Project”	단순 문구 중심, 페이지 하단 고정


⸻

10. ⚙️ 기술 스택 고려 (Next.js 기반 구현 가정)

영역	기술	설명
프레임워크	Next.js (App Router)	정적/서버 렌더링, Protected Route 설정
언어	TypeScript	타입 안정성 및 유지보수성
스타일링	TailwindCSS	반응형, Airbnb 유사 스타일
인증 관리	Supabase Auth	로그인/회원가입 세션 처리
데이터베이스	Supabase (PostgreSQL)	회원 및 북마크 데이터 저장
시각화	Chart.js or Recharts	마이페이지 내 카테고리별 통계
상태관리	React Query / Zustand	북마크 상태 및 세션 관리
배포 환경	Vercel	자동 빌드 및 배포


⸻

📋 요약

항목	주요 내용
서비스명	HobbyFind
페이지 수	5 (홈, 카테고리 3종, 로그인, 회원가입, 마이페이지)
비회원 기능	탐색, 카테고리 이동
회원 기능	북마크, 마이페이지 통계
핵심 컴포넌트	TopBar, HobbyCard, BookmarkButton, StatsChart
URL 구조	/, /category/[type], /login, /signup, /mypage
기술 스택	Next.js + TailwindCSS + Supabase
디자인 원칙	심플하고 직관적인 카드형 탐색 중심 UI


⸻
