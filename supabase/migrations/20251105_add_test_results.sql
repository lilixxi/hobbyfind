-- Table to store user's latest hobby type test result
BEGIN;

CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  result_type TEXT NOT NULL CHECK (result_type IN ('sports','intelligence','arts')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Only keep latest per user (unique constraint)
CREATE UNIQUE INDEX IF NOT EXISTS uniq_test_results_user ON test_results(user_id);

-- RLS
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read own test result" ON test_results;
CREATE POLICY "read own test result" ON test_results
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "upsert own test result" ON test_results;
CREATE POLICY "upsert own test result" ON test_results
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update own test result" ON test_results;
CREATE POLICY "update own test result" ON test_results
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

COMMIT;

