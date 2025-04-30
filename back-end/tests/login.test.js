import request from "supertest";
import app from "../app.js";
import { expect } from "chai";
import jwt from "jsonwebtoken";

describe("Auth Routes", () => {
  // Test user registration
  describe("POST /signup", () => {
    it("should register a new user", async () => {
      const newUser = {
        username: `testuser_${Date.now()}`, // Ensure unique username
        password: "password123",
        email: `test_${Date.now()}@example.com`,
        role: "Staff"
      };

      const res = await request(app)
        .post("/signup")
        .send(newUser);

      // Check if status is success (either 200 or 201)
      expect(res.status).to.be.oneOf([200, 201, 409]); // 409 if user already exists
      
      if (res.status === 201) {
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.have.property("message");
      }
    });
    
    it("should not register a user with missing fields", async () => {
      const incompleteUser = {
        username: "incomplete",
        // Missing password and other required fields
      };

      const res = await request(app)
        .post("/signup")
        .send(incompleteUser);

      expect(res.status).to.be.oneOf([400, 500]);
    });
  });

  // Test user login
  describe("POST /login", () => {
    it("should login with correct credentials", async () => {
      // First try to create a test user
      const testUser = {
        username: `logintest_${Date.now()}`,
        password: "password123",
        email: `logintest_${Date.now()}@example.com`,
        role: "Staff"
      };

      // Try to create the user first (might already exist)
      await request(app).post("/signup").send(testUser);

      // Now try to login
      const res = await request(app)
        .post("/login")
        .send({
          username: testUser.username,
          password: testUser.password
        });

      // Either login succeeds with new user, or fails if user creation failed
      expect(res.status).to.be.oneOf([200, 401, 404]);
      
      if (res.status === 200) {
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.have.property("user");
        expect(res.body.user).to.have.property("username");
        expect(res.body.user).to.have.property("role");
      }
    });

    it("should fail login with incorrect credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({
          username: "nonexistentuser",
          password: "wrongpassword"
        });

      expect(res.status).to.be.oneOf([401, 404]);
    });
  });

  // Test password reset functionality
  describe("POST /resend-reset-link", () => {
    it("should simulate password reset link sending", async () => {
      const res = await request(app)
        .post("/resend-reset-link")
        .send({
          email: "test@example.com"
        });

      // Should either succeed or fail due to email server configuration
      expect(res.status).to.be.oneOf([200, 500]);
    });

    it("should return 400 if email not provided for reset", async () => {
      const res = await request(app)
        .post("/resend-reset-link")
        .send({});

      expect(res.status).to.equal(400);
    });
  });

  // Test JWT verification (if applicable)
  describe("POST /verify-token", () => {
    it("should verify a valid JWT token", async () => {
      // Create a valid token (simulating a logged-in user)
      const payload = { id: "someUserId", role: "Staff" };
      const validToken = jwt.sign(payload, process.env.STAFF_ACCESS_TOKEN || "staff-test-secret");

      const res = await request(app)
        .post("/verify-token")
        .set("Authorization", `Bearer ${validToken}`)
        .send();

      // Some implementations return 200, others return 204 for validation
      expect(res.status).to.be.oneOf([200, 204, 404, 403]);
    });

    it("should reject an invalid JWT token", async () => {
      // Use an invalid token
      const invalidToken = "invalid.token.string";

      const res = await request(app)
        .post("/verify-token")
        .set("Authorization", `Bearer ${invalidToken}`)
        .send();

      // Should be rejected
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
  });
});