# Supabase Setup Guide - HobbyFind

## 📋 데이터베이스 구조

### Tables

#### 1. `users` 테이블
사용자 정보 저장

```sql
- id (UUID, PK)
- email (VARCHAR, UNIQUE)
- password_hash (TEXT)
- name (VARCHAR, nullable)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 2. `bookmarks` 테이블
사용자 북마크 저장

```sql
- id (UUID, PK)
- user_id (UUID, FK → users.id)
- hobby_id (VARCHAR)
- created_at (TIMESTAMP)
- UNIQUE(user_id, hobby_id)
```

## 🚀 설정 단계

### 1. Supabase 프로젝트 생성
1. https://supabase.com 접속
2. 새 프로젝트 생성
3. 데이터베이스 비밀번호 설정

### 2. Migration 실행

Supabase 대시보드 → **SQL Editor**에서 다음 순서로 실행:

#### Step 1: 기본 테이블 및 정책 생성
```bash
supabase/migrations/20250105_create_users_table.sql
```

#### Step 2: INSERT 정책 추가 (회원가입 허용)
```bash
supabase/migrations/20250105_fix_insert_policy.sql
```

#### Step 3: (선택) 북마크 정책 개선
```bash
supabase/migrations/20250105_improve_bookmark_policies.sql
```

#### Step 4: 검증
```bash
supabase/migrations/verify_and_setup.sql
```

### 3. 환경 변수 설정

`.env.local` 파일 생성:

```bash
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# NextAuth 설정
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

**키 찾는 방법:**
1. Supabase 대시보드 → Settings → API
2. Project URL 복사 → `NEXT_PUBLIC_SUPABASE_URL`
3. `anon public` 키 복사 → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. `service_role` 키 복사 → `SUPABASE_SERVICE_ROLE_KEY` ⚠️

### 4. 서버 재시작

```bash
npm run dev
```

## 🔒 보안 설정

### Row Level Security (RLS)

**현재 정책:**

#### Users 테이블
- ✅ INSERT: 누구나 가능 (회원가입)
- ✅ SELECT: 인증된 사용자만
- ✅ UPDATE: 본인 데이터만

#### Bookmarks 테이블
- ✅ SELECT: 인증된 사용자만
- ✅ INSERT: 인증된 사용자만
- ✅ DELETE: 인증된 사용자만
- ✅ UPDATE: 인증된 사용자만

> **Note:** 현재는 서버 사이드에서 `service_role` 키를 사용하므로 RLS를 우회합니다. 
> 실제 보안은 NextAuth 세션과 API Route에서 검증합니다.

## 📊 데이터 확인

### SQL Editor에서 실행:

```sql
-- 사용자 목록
SELECT id, email, name, created_at FROM users;

-- 북마크 목록
SELECT 
  b.id,
  u.email,
  b.hobby_id,
  b.created_at
FROM bookmarks b
JOIN users u ON b.user_id = u.id
ORDER BY b.created_at DESC;

-- 사용자별 북마크 개수
SELECT 
  u.email,
  COUNT(b.id) as bookmark_count
FROM users u
LEFT JOIN bookmarks b ON u.id = b.user_id
GROUP BY u.email, u.id;
```

## 🧪 테스트

### 1. 회원가입 테스트
```
1. http://localhost:3000/signup
2. 이메일/비밀번호 입력
3. Supabase에서 users 테이블 확인
```

### 2. 북마크 테스트
```
1. 로그인
2. 취미 카드에서 하트 클릭
3. Supabase에서 bookmarks 테이블 확인
```

### 3. 마이페이지 테스트
```
1. http://localhost:3000/mypage
2. 북마크한 취미 표시 확인
3. 통계 차트 확인
```

## 🔧 트러블슈팅

### 문제: "Invalid supabaseUrl"
**해결:** `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL` 설정 확인

### 문제: "Email already exists" (실제로는 없음)
**해결:** 
1. `SUPABASE_SERVICE_ROLE_KEY` 확인 (anon key가 아닌 service_role key)
2. INSERT 정책 확인

### 문제: 북마크가 저장되지 않음
**해결:**
1. bookmarks 테이블 생성 확인
2. RLS 정책 확인
3. 브라우저 콘솔과 서버 로그 확인

## 📝 API Endpoints

### 북마크 API
- `GET /api/bookmarks` - 사용자의 모든 북마크 조회
- `POST /api/bookmarks` - 북마크 추가
  ```json
  { "hobbyId": "sports-1" }
  ```
- `DELETE /api/bookmarks?hobbyId=sports-1` - 북마크 삭제

## 🎯 다음 단계

1. ✅ 회원가입/로그인 테스트
2. ✅ 북마크 추가/삭제 테스트
3. ✅ 마이페이지 통계 확인
4. ⚙️ (선택) 프로필 이미지 추가
5. ⚙️ (선택) 소셜 로그인 추가

## 📚 참고 자료

- [Supabase Docs](https://supabase.com/docs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [NextAuth.js](https://next-auth.js.org/)

