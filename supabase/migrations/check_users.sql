-- 현재 users 테이블의 모든 데이터 확인
SELECT * FROM users;

-- 특정 이메일이 존재하는지 확인 (your-email@example.com을 실제 이메일로 변경)
-- SELECT * FROM users WHERE email = 'your-email@example.com';

-- users 테이블의 정책 확인
SELECT * FROM pg_policies WHERE tablename = 'users';

-- 테이블이 존재하는지 확인
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'users';

