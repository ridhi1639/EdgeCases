import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { config } from './config.js';
import { query } from './db.js';
import { notFound, errorHandler } from './errors.js';
import authRoutes from './routes/auth.js';
export function createApp() {
    const app = express();

    app.use(helmet());
    app.use(cors({ origin: config.clientOrigins, credentials: true }));
    app.use(express.json({ limit: '200kb' }));
    app.use(cookieParser());

    app.get('/api/health', async (_req, res, next) => {
        try {
            await query('SELECT 1');
            res.json({ status: 'ok', db: 'up' });
        } catch (err) {
            next(err);
        }
    });
    app.use('/api/auth', authRoutes);
    app.use(notFound);
    app.use(errorHandler);

    return app;
}