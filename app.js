import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';
import 'dotenv/config';

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', authRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res) => {
  const { status = 500, message = 'Route not found' } = err;
  res.status(status).json({ message });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

export default app;
