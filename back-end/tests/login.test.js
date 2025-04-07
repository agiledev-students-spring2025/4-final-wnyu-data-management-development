import request from 'supertest';
import app from '../app.js';
import { expect } from 'chai';

describe('Auth Routes', () => {
  const testUser = {
    username: 'testuser123',
    password: 'testpass',
    email: 'testuser@example.com',
    role: 'staff'
  };

  // Signup test
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/signup')
      .send(testUser);

    expect(res.status).to.be.oneOf([201, 400]); 
    expect(res.body).to.have.property('message');
  });

  // Login test
  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: testUser.username,
        password: testUser.password
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('user');
    expect(res.body.user.username).to.equal(testUser.username);
  });

  // Login failure test
  it('should fail login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({
        username: 'wronguser',
        password: 'wrongpass'
      });

    expect(res.status).to.equal(401);
    expect(res.body.message).to.equal('Invalid username or password');
  });

  // Forgot password test
  it('should simulate password reset link sending', async () => {
    const res = await request(app)
      .post('/resend-reset-link')
      .send({ email: testUser.email });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Password Reset Email is sent');
  });

  it('should return 400 if email not provided for reset', async () => {
    const res = await request(app)
      .post('/resend-reset-link')
      .send({});

    expect(res.status).to.equal(400);
    expect(res.body.message).to.equal('Email is required');
  });
});
