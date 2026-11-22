const required = (name) => {
  const v = process.env[name];
  if (!v) throw new Error(`Missing required environment variable: ${name}`);
  return v;
};

export const config = {
  port: Number(process.env.PORT || 8000),
  isProd: process.env.NODE_ENV === 'production',
  clientOrigins: (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  databaseUrl: required('DATABASE_URL'),
  databaseSsl: process.env.DATABASE_SSL !== 'false',
  jwtSecret: required('JWT_SECRET'),
  jwtExpiresDays: Number(process.env.JWT_EXPIRES_DAYS || 7),
};

if (config.isProd && config.jwtSecret.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters in production');
}