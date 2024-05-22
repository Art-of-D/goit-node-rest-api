import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import contactsRouter from './routes/contactsRouter.js';
import authRouter from './routes/authRouter.js';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const { DB_HOST, PORT = 3000 } = process.env;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

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

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    return app.listen(PORT, () => {
      console.log(`Server is running. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
