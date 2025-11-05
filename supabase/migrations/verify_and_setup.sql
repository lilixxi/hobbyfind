-- ============================================
-- HobbyFind Database Setup & Verification
-- ============================================

-- 1. Check if tables exist
SELECT 
  table_name,
  table_type
FROM information_schema.tables
WHERE table_schema = 'public' 
  AND table_name IN ('users', 'bookmarks')
ORDER BY table_name;

-- 2. Check users table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'users'
ORDER BY ordinal_position;

-- 3. Check bookmarks table structure
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public' 
  AND table_name = 'bookmarks'
ORDER BY ordinal_position;

-- 4. Check RLS is enabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'bookmarks');

-- 5. Check existing policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('users', 'bookmarks')
ORDER BY tablename, policyname;

-- 6. Check indexes
SELECT 
  indexname,
  tablename,
  indexdef
FROM pg_indexes
WHERE schemaname = 'public' 
  AND tablename IN ('users', 'bookmarks')
ORDER BY tablename, indexname;

-- 7. Sample data count (optional - uncomment to run)
-- SELECT 'users' as table_name, COUNT(*) as count FROM users
-- UNION ALL
-- SELECT 'bookmarks' as table_name, COUNT(*) as count FROM bookmarks;

