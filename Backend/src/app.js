import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
const clientURL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(cors({
    origin: clientURL,
    credentials: true
}));

/* Require all the routes here */
import authRouter from './routes/auth.routes.js';
import snippetRouter from './routes/snippet.routes.js';

/* Use the routes here */
app.use('/api/auth', authRouter); 
app.use('/api/snippets', snippetRouter);

/* Error Middleware */
app.use(errorMiddleware);

export default app;