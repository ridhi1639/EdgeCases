import jwt from 'jsonwebtoken';
import { config } from './config.js';
import { HttpError } from './errors.js';

export const COOKIE_NAME = 'ec_token';

export function signToken(userId, days) {
  return jwt.sign({ sub: userId }, config.jwtSecret, { algorithm: 'HS256', expiresIn: `${days}d` });
}

const cookieBase = () => ({
  httpOnly: true,
  secure: config.isProd,
  // Cross-site (frontend and API on different domains) needs SameSite=None + Secure.
  sameSite: config.isProd ? 'none' : 'lax',
  path: '/',
});

export function setAuthCookie(res, token, { persistent, days }) {
  res.cookie(COOKIE_NAME, token, {
    ...cookieBase(),
    ...(persistent ? { maxAge: days * 24 * 60 * 60 * 1000 } : {}),
  });
}

export function clearAuthCookie(res) {
  res.clearCookie(COOKIE_NAME, cookieBase());
}

export function readToken(req) {
  const header = req.headers.authorization;
  if (header?.startsWith('Bearer ')) return header.slice(7);
  return req.cookies?.[COOKIE_NAME] || null;
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret, { algorithms: ['HS256'] });
  } catch {
    return null;
  }
}

export function requireAuth(req, _res, next) {
  const payload = verifyToken(readToken(req) || '');
  if (!payload) return next(new HttpError(401, 'Not authenticated'));
  req.userId = payload.sub;
  next();
}

// Sets req.userId when a valid token is present but never rejects (for public pages).
export function optionalAuth(req, _res, next) {
  const payload = verifyToken(readToken(req) || '');
  if (payload) req.userId = payload.sub;
  next();
}