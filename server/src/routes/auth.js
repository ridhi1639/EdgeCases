import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { query, withTransaction } from '../db.js';
import { HttpError } from '../errors.js';
import { signToken, setAuthCookie, requireAuth } from '../auth.js';

const router = Router();

const signupSchema = z.object({
    fullName: z.string().trim().min(1, 'Full name is required.').max(100),
    username: z.string().trim().regex(/^[A-Za-z0-9_]{3,20}$/, 'Username must be 3-20 characters (letters, numbers, underscores).'),
    email: z.string().trim().toLowerCase().email('Please provide a valid email address.').max(254),
    password: z.string().min(6, 'Password must be at least 6 characters.').max(128),
});
const loginSchema = z.object({
    email: z.string().trim().toLowerCase().email('Please provide a valid email address.'),
    password: z.string().min(1, 'Password is required.').max(128),
    rememberMe: z.boolean().optional(),
});

function issueSession(res, userId, rememberMe) {
    const days = rememberMe ? 30 : 1;
    setAuthCookie(res, signToken(userId, days), { persistent: !!rememberMe, days });
}

// Compared against when the email doesn't exist, so login timing doesn't reveal registered emails.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', 12);
router.post('/signup', async (req, res, next) => {
    try {
        const { fullName, username, email, password } = signupSchema.parse(req.body);
        const passwordHash = await bcrypt.hash(password, 12);

        let user;
        try {
            user = await withTransaction(async (db) => {
                const { rows } = await db.query(
                    `INSERT INTO users (username, email, password_hash, full_name)
           VALUES ($1, $2, $3, $4)
           RETURNING id, username, email, full_name`,
                    [username, email, passwordHash, fullName]
                );
                await db.query('INSERT INTO user_stats (user_id) VALUES ($1)', [rows[0].id]);
                return rows[0];
            });
        } catch (err) {
            if (err.code === '23505') {
                const isEmail = String(err.constraint).includes('email');
                throw new HttpError(
                    409,
                    isEmail ? 'An account with this email already exists.' : 'That username is already taken.'
                );
            }
            throw err;
        }

        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});
router.post('/login', async (req, res, next) => {
    try {
        const { email, password, rememberMe } = loginSchema.parse(req.body);
        const { rows } = await query(
            'SELECT id, username, email, full_name, password_hash FROM users WHERE lower(email) = $1',
            [email]
        );
        const user = rows[0];
        const ok = await bcrypt.compare(password, user ? user.password_hash : DUMMY_HASH);
        if (!user || !ok) throw new HttpError(401, 'Invalid email or password.');

        issueSession(res, user.id, rememberMe);
        res.json({ id: user.id, username: user.username, email: user.email, full_name: user.full_name });
    } catch (err) {
        next(err);
    }
});
router.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await query(
      'SELECT id, username, email, full_name FROM users WHERE id = $1',
      [req.userId]
    );
    if (!rows[0]) throw new HttpError(401, 'Not authenticated');
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
});

export default router;