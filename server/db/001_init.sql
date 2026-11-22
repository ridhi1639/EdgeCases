-- Edge Cases — initial schema (PostgreSQL / Supabase)

-- ───────────── Users ─────────────
CREATE TABLE users (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username           VARCHAR(20)  NOT NULL CHECK (username ~ '^[A-Za-z0-9_]{3,20}$'),
  email              VARCHAR(254) NOT NULL,
  password_hash      TEXT         NOT NULL,
  full_name          VARCHAR(100) NOT NULL,
  preferred_language VARCHAR(12)  NOT NULL DEFAULT 'python'
                       CHECK (preferred_language IN ('python','javascript','cpp','java')),
  editor_preferences JSONB        NOT NULL DEFAULT '{"theme":"vs-dark","fontSize":14,"tabSize":4,"keybindings":"standard","minimap":false}',
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX users_username_lower_uq ON users (lower(username));
CREATE UNIQUE INDEX users_email_lower_uq    ON users (lower(email));

-- One row per user: rating + aggregate stats (also drives the leaderboard)
CREATE TABLE user_stats (
  user_id          UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  rating           INTEGER NOT NULL DEFAULT 1400 CHECK (rating >= 0),
  wins             INTEGER NOT NULL DEFAULT 0 CHECK (wins >= 0),
  losses           INTEGER NOT NULL DEFAULT 0 CHECK (losses >= 0),
  draws            INTEGER NOT NULL DEFAULT 0 CHECK (draws >= 0),
  current_streak   INTEGER NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
  best_streak      INTEGER NOT NULL DEFAULT 0 CHECK (best_streak >= 0),
  virtual_coins    INTEGER NOT NULL DEFAULT 0 CHECK (virtual_coins >= 0),
  last_active_date DATE
);
CREATE INDEX user_stats_rating_idx ON user_stats (rating DESC);

CREATE TABLE rating_history (
  id           BIGSERIAL PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  match_id     TEXT,
  rating_after INTEGER NOT NULL,
  delta        INTEGER NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX rating_history_user_idx ON rating_history (user_id, created_at DESC);
CREATE INDEX rating_history_created_idx ON rating_history (created_at);

-- Powers the streak calendar
CREATE TABLE daily_activity (
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day             DATE NOT NULL,
  problems_solved INTEGER NOT NULL DEFAULT 0,
  battles_played  INTEGER NOT NULL DEFAULT 0,
  rating_delta    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);

CREATE TABLE memberships (
  id         BIGSERIAL PRIMARY KEY,
  user_id    UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan       VARCHAR(10) NOT NULL CHECK (plan IN ('silver','gold')),
  billing    VARCHAR(10) NOT NULL CHECK (billing IN ('monthly','yearly')),
  status     VARCHAR(12) NOT NULL DEFAULT 'active' CHECK (status IN ('active','cancelled','expired')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  payment_ref TEXT
);
CREATE INDEX memberships_user_idx ON memberships (user_id, status, expires_at DESC);

-- ───────────── Problems ─────────────
CREATE TABLE problems (
  id               TEXT PRIMARY KEY,                  -- stable id used by the frontend, e.g. 'valid-parentheses'
  slug             TEXT NOT NULL UNIQUE,
  title            TEXT NOT NULL,
  difficulty       VARCHAR(8) NOT NULL CHECK (difficulty IN ('Easy','Medium','Hard')),
  topic            TEXT NOT NULL,
  description      TEXT NOT NULL,
  input_format     TEXT NOT NULL DEFAULT '',
  output_format    TEXT NOT NULL DEFAULT '',
  examples         JSONB NOT NULL DEFAULT '[]',
  constraints      JSONB NOT NULL DEFAULT '[]',
  hints            JSONB NOT NULL DEFAULT '[]',
  companies        TEXT[] NOT NULL DEFAULT '{}',
  approach         TEXT,                              -- premium: optimal approach write-up
  is_premium       BOOLEAN NOT NULL DEFAULT FALSE,
  time_limit_ms    INTEGER NOT NULL DEFAULT 1000 CHECK (time_limit_ms BETWEEN 100 AND 15000),
  memory_limit_mb  INTEGER NOT NULL DEFAULT 256 CHECK (memory_limit_mb BETWEEN 16 AND 1024),
  function_name    TEXT,                              -- entry point the judge calls
  signature        JSONB,                             -- {"params":[{"name","type"}],"returns":"type"}
  reference_solution TEXT,                            -- Python; used to generate/verify expected outputs
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX problems_filter_idx ON problems (is_premium, difficulty, topic);

CREATE TABLE problem_starter_code (
  problem_id TEXT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  language   VARCHAR(12) NOT NULL CHECK (language IN ('python','javascript','cpp','java')),
  code       TEXT NOT NULL,
  PRIMARY KEY (problem_id, language)
);

CREATE TABLE test_cases (
  id            BIGSERIAL PRIMARY KEY,
  problem_id    TEXT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  display_input TEXT NOT NULL,                        -- human readable, e.g. 's = "abc"'
  input_args    JSONB NOT NULL,                       -- typed arguments, in parameter order
  expected      JSONB NOT NULL,
  is_hidden     BOOLEAN NOT NULL DEFAULT FALSE,
  explanation   TEXT
);
CREATE INDEX test_cases_problem_idx ON test_cases (problem_id, is_hidden, sort_order);

-- ───────────── Matches ─────────────
CREATE TABLE matches (
  id                 TEXT PRIMARY KEY,                -- e.g. 'match_a1b2c3d4'
  mode               VARCHAR(10) NOT NULL DEFAULT 'battle' CHECK (mode IN ('battle','practice')),
  problem_id         TEXT NOT NULL REFERENCES problems(id),
  difficulty         VARCHAR(8),
  language           VARCHAR(12),
  status             VARCHAR(12) NOT NULL DEFAULT 'active' CHECK (status IN ('active','finished','abandoned')),
  time_limit_seconds INTEGER NOT NULL DEFAULT 900 CHECK (time_limit_seconds > 0),
  started_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at           TIMESTAMPTZ
);
CREATE INDEX matches_status_idx ON matches (status, started_at);

CREATE TABLE match_participants (
  match_id       TEXT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES users(id),
  rating_before  INTEGER NOT NULL,
  rating_after   INTEGER,
  result         VARCHAR(8) CHECK (result IN ('win','loss','draw')),
  best_passed    INTEGER NOT NULL DEFAULT 0,
  total_tests    INTEGER NOT NULL DEFAULT 0,
  finished_at    TIMESTAMPTZ,
  PRIMARY KEY (match_id, user_id)
);
CREATE INDEX match_participants_user_idx ON match_participants (user_id, match_id);

CREATE TABLE match_results (
  match_id         TEXT PRIMARY KEY REFERENCES matches(id) ON DELETE CASCADE,
  winner_id        UUID REFERENCES users(id),         -- NULL = draw
  outcome          VARCHAR(10) NOT NULL CHECK (outcome IN ('solved','timeout','forfeit','draw')),
  duration_seconds INTEGER NOT NULL CHECK (duration_seconds >= 0),
  decided_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX match_results_winner_idx ON match_results (winner_id, decided_at DESC);

-- ───────────── Submissions ─────────────
CREATE TABLE submissions (
  id           BIGSERIAL PRIMARY KEY,
  user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id   TEXT NOT NULL REFERENCES problems(id),
  match_id     TEXT REFERENCES matches(id) ON DELETE SET NULL,
  language     VARCHAR(12) NOT NULL CHECK (language IN ('python','javascript','cpp','java')),
  code         TEXT NOT NULL CHECK (length(code) <= 65536),
  status       VARCHAR(24) NOT NULL,                  -- Accepted, Wrong Answer, Time Limit Exceeded, ...
  passed_count INTEGER NOT NULL DEFAULT 0,
  total_count  INTEGER NOT NULL DEFAULT 0,
  runtime_ms   INTEGER,
  memory_kb    INTEGER,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX submissions_user_idx    ON submissions (user_id, created_at DESC);
CREATE INDEX submissions_problem_idx ON submissions (problem_id, status);
CREATE INDEX submissions_match_idx   ON submissions (match_id, user_id, created_at);

CREATE TABLE submission_case_results (
  submission_id BIGINT NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  test_case_id  BIGINT NOT NULL REFERENCES test_cases(id) ON DELETE CASCADE,
  status        VARCHAR(24) NOT NULL,
  runtime_ms    INTEGER,
  memory_kb     INTEGER,
  PRIMARY KEY (submission_id, test_case_id)
);

CREATE TABLE solved_problems (
  user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id      TEXT NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  first_solved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, problem_id)
);

-- ───────────── Contact form ─────────────
CREATE TABLE contact_messages (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(254) NOT NULL,
  phone      VARCHAR(30),
  message    TEXT NOT NULL CHECK (length(message) <= 5000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ───────────── Security ─────────────
-- Supabase exposes public tables through its auto REST API. Enabling RLS with no policies
-- blocks that API (anon key). The Express server connects as the database owner role, which
-- bypasses RLS, so it is unaffected.
DO $$
DECLARE t TEXT;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  END LOOP;
END $$;