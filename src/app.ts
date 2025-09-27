import express from 'express';
import bodyParser from 'body-parser';
import config from './config';

const app = express();
app.use(bodyParser.json());

app.get('/health', (req, res) => res.json({ ok: true }));
import userRoutes from './routes/userRoutes';
app.use('/api/users', userRoutes);

export default app;
