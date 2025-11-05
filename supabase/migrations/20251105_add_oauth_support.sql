-- OAuth support for users table
-- 1) Make password_hash nullable (social logins don't have local password)
-- 2) Add optional provider and image columns
-- 3) Backfill provider for existing credential users

BEGIN;

-- 1) allow NULL password for social accounts
ALTER TABLE users
  ALTER COLUMN password_hash DROP NOT NULL;

-- 2) add provider and image
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'provider'
  ) THEN
    ALTER TABLE users ADD COLUMN provider TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'image'
  ) THEN
    ALTER TABLE users ADD COLUMN image TEXT;
  END IF;
END$$;

-- 3) optional backfill for existing rows
UPDATE users SET provider = COALESCE(provider, 'credentials') WHERE provider IS NULL;

COMMIT;

-- Note: RLS policies remain unchanged. If you later move to Supabase Auth,
-- revisit policies that depend on auth.uid().


