import mongoose from 'mongoose';
import app from '../app.js';
import request from 'supertest';
import { verifyToken } from '../helpers/authUtils.js';
import User from '../db/User.js';

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe('User Controller', () => {
  let server = null;
  const userData = { email: 'test@example.com', password: 'password123' };

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await User.deleteOne({ email: userData.email });
    await mongoose.connection.close();
    server.close();
  });

  test('test auth controller signup', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/users/register')
      .send(userData);
    expect(statusCode).toBe(201);
    expect(body).toEqual({
      user: {
        email: 'test@example.com',
        subscription: 'starter',
      },
    });
  });

  test('test auth controller login', async () => {
    const { statusCode, body } = await request(app)
      .post('/api/users/login')
      .send(userData);

    expect(statusCode).toBe(200);

    const { token, user } = body;
    const checkToken = verifyToken(token);
    expect(checkToken).toBeTruthy();

    expect(user).toEqual({
      email: 'test@example.com',
      subscription: 'starter',
    });
  });
});
