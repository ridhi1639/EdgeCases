import { query } from './db.js';

// Rating tiers (matches the tier names the frontend displays).
export function tierForRating(rating) {
  if (rating >= 2400) return 'Grandmaster';
  if (rating >= 2200) return 'Master';
  if (rating >= 1700) return 'Specialist';
  return 'Apprentice';
}

// Builds the user object exactly as the React app expects (see INITIAL_USER in the frontend).
export async function loadUserProfile(userId) {
  const { rows } = await query(
    `SELECT u.id, u.username, u.email, u.full_name, u.preferred_language, u.editor_preferences,
            s.rating, s.wins, s.losses, s.draws, s.current_streak, s.virtual_coins,
            (SELECT delta FROM rating_history r WHERE r.user_id = u.id ORDER BY r.created_at DESC, r.id DESC LIMIT 1) AS last_delta,
            (SELECT plan FROM memberships m
               WHERE m.user_id = u.id AND m.status = 'active' AND m.expires_at > now()
               ORDER BY m.expires_at DESC LIMIT 1) AS plan,
            COALESCE((SELECT array_agg(sp.problem_id) FROM solved_problems sp WHERE sp.user_id = u.id), '{}') AS solved
       FROM users u JOIN user_stats s ON s.user_id = u.id
      WHERE u.id = $1`,
    [userId]
  );
  const r = rows[0];
  if (!r) return null;

  const battles = r.wins + r.losses + r.draws;
  const delta = r.last_delta ?? 0;
  return {
    id: r.id,
    fullName: r.full_name,
    username: r.username,
    email: r.email,
    rating: r.rating,
    ratingChange: `${delta >= 0 ? '+' : ''}${delta}`,
    tier: tierForRating(r.rating),
    battlesCount: battles,
    wins: r.wins,
    losses: r.losses,
    draws: r.draws,
    winRate: battles ? `${((r.wins / battles) * 100).toFixed(1)}%` : '0%',
    streak: r.current_streak,
    virtualCoins: r.virtual_coins,
    preferredLanguage: r.preferred_language,
    editorPreferences: r.editor_preferences,
    solvedProblemIds: r.solved,
    isPremium: !!r.plan,
    membership: r.plan || null,
  };
}