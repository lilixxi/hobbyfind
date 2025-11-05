# 🚀 Supabase 설정 체크리스트

북마크 기능을 사용하기 위해 다음 단계를 순서대로 완료하세요.

## ✅ 1단계: Supabase 프로젝트 설정

- [ ] Supabase 계정 생성 (https://supabase.com)
- [ ] 새 프로젝트 생성
- [ ] 프로젝트 이름 및 DB 비밀번호 설정
- [ ] 프로젝트 생성 완료 대기 (~2분)

## ✅ 2단계: Migration 실행

Supabase 대시보드 → **SQL Editor** → **New Query**

### 2-1. 기본 테이블 생성
- [ ] `20250105_create_users_table.sql` 내용 복사
- [ ] SQL Editor에 붙여넣기
- [ ] **Run** 버튼 클릭
- [ ] ✅ "Success. No rows returned" 확인

### 2-2. INSERT 정책 추가
- [ ] `20250105_fix_insert_policy.sql` 내용 복사
- [ ] SQL Editor에 붙여넣기
- [ ] **Run** 버튼 클릭
- [ ] ✅ "Success" 확인

### 2-3. 검증 (선택)
- [ ] `verify_and_setup.sql` 실행
- [ ] users, bookmarks 테이블 확인
- [ ] 정책(policies) 확인

## ✅ 3단계: API 키 복사

Supabase 대시보드 → **Settings** → **API**

- [ ] **Project URL** 복사 → 메모장에 저장
- [ ] **Project API keys** 섹션에서:
  - [ ] `anon` `public` 키 복사 → 메모장에 저장
  - [ ] `service_role` 키 복사 → 메모장에 저장 ⚠️ **중요!**

## ✅ 4단계: 환경 변수 설정

프로젝트 루트에 `.env.local` 파일 생성 (없다면)

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

- [ ] `NEXT_PUBLIC_SUPABASE_URL` 입력
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 입력
- [ ] `SUPABASE_SERVICE_ROLE_KEY` 입력 (service_role!)
- [ ] `NEXTAUTH_SECRET` 생성 (아래 명령어 실행):
  ```bash
  openssl rand -base64 32
  ```
- [ ] 파일 저장

## ✅ 5단계: 서버 재시작

```bash
# 터미널에서
# Ctrl+C로 현재 서버 종료
npm run dev
```

- [ ] 서버 종료 (Ctrl+C)
- [ ] `npm run dev` 실행
- [ ] 에러 없이 시작 확인

## ✅ 6단계: 기능 테스트

### 6-1. 회원가입
- [ ] http://localhost:3000/signup 접속
- [ ] 이메일/비밀번호 입력 (조건 충족)
- [ ] 회원가입 성공 확인
- [ ] Supabase Table Editor → users 테이블에서 데이터 확인

### 6-2. 로그인
- [ ] http://localhost:3000/login 접속
- [ ] 가입한 이메일/비밀번호로 로그인
- [ ] 로그인 성공 → 홈으로 리다이렉트 확인
- [ ] 상단바에 "마이페이지" 버튼 표시 확인

### 6-3. 북마크
- [ ] 홈 페이지에서 취미 카드의 하트 아이콘 클릭
- [ ] "북마크 추가" 토스트 알림 확인
- [ ] 하트 색상이 초록색으로 변경 확인
- [ ] Supabase Table Editor → bookmarks 테이블에서 데이터 확인

### 6-4. 마이페이지
- [ ] http://localhost:3000/mypage 접속
- [ ] 북마크한 취미 카드 표시 확인
- [ ] 통계 차트 표시 확인
- [ ] 북마크 해제 테스트 (하트 클릭)

## 🐛 문제 발생 시

### "Invalid supabaseUrl" 에러
→ `.env.local` 파일 확인, 서버 재시작

### "Email already exists" (실제로는 없음)
→ `SUPABASE_SERVICE_ROLE_KEY` 확인 (service_role 키인지)

### 북마크가 안 보임
→ Supabase Table Editor에서 bookmarks 테이블 확인
→ 브라우저 콘솔(F12) 에러 확인

### 로그인 안 됨
→ Supabase Table Editor에서 users 테이블에 데이터 있는지 확인
→ 비밀번호 조건 충족했는지 확인

## ✨ 완료!

모든 체크리스트를 완료했다면 HobbyFind의 모든 기능을 사용할 수 있습니다!

- ✅ 회원가입/로그인
- ✅ 취미 탐색
- ✅ 카테고리 필터
- ✅ 북마크 추가/삭제
- ✅ 마이페이지 통계

---

**문제가 계속되면 `supabase/README.md`의 트러블슈팅 섹션을 참고하세요!**

