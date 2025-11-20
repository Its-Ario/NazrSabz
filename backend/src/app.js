import { config } from 'dotenv';
config({ path: '../.env' });

import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './logger.js';
import passport from './config/passport.js';

import mainRoutes from './routes/mainRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import requestRoutes from './routes/requestRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(passport.initialize());

app.use(
    morgan('combined', {
        stream: {
            write: (message) => logger.info(message.trim()),
        },
    })
);

app.use(express.static('public'));

app.use('/api', mainRoutes);
app.use('/api', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

export default app;
