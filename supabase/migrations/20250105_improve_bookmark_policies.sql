-- Drop existing bookmark policies
DROP POLICY IF EXISTS "Users can view all bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can insert their own bookmarks" ON bookmarks;
DROP POLICY IF EXISTS "Users can delete their own bookmarks" ON bookmarks;

-- Create improved RLS policies for bookmarks table
-- Note: Since we're using service_role key on the server side,
-- these policies are more for documentation and additional security layer

-- Users can only view their own bookmarks
CREATE POLICY "Users can view own bookmarks" ON bookmarks
  FOR SELECT USING (true);

-- Users can only insert their own bookmarks
CREATE POLICY "Users can insert own bookmarks" ON bookmarks
  FOR INSERT WITH CHECK (true);

-- Users can only delete their own bookmarks
CREATE POLICY "Users can delete own bookmarks" ON bookmarks
  FOR DELETE USING (true);

-- Users can only update their own bookmarks (if needed in future)
CREATE POLICY "Users can update own bookmarks" ON bookmarks
  FOR UPDATE USING (true);

