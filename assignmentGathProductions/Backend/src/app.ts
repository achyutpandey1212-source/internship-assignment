import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/config.js';
import authRoutes from './routes/Auth.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use('/api/v1/auth', authRoutes);

app.use(errorMiddleware);

export default app;
