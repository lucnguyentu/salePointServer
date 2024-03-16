import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';
import test from './routes/testRouter.js';
import service from './routes/ServiceRouter.js';

const app = express();
app.use(cookieParser());

app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/api/v1', test);
app.use('/api/v1', service);

// middleware
app.use(errorMiddleware);

export default app;
