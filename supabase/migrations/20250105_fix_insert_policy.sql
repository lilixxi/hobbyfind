-- Add INSERT policy for users table (회원가입 허용)
DROP POLICY IF EXISTS "Anyone can insert users" ON users;

CREATE POLICY "Anyone can insert users" ON users
  FOR INSERT WITH CHECK (true);

