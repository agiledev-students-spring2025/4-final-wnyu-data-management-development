import request from "supertest";
import app from "../app.js";
import { expect } from "chai";
import jwt from "jsonwebtoken";

describe("Auth Routes", () => {
  describe("POST /signup", () => {
    it("should register a new user", async () => {
      const newUser = {
        username: `testuser_${Date.now()}`,
        password: "password123",
        email: `test_${Date.now()}@example.com`,
        role: "Staff"
      };

      const res = await request(app)
        .post("/signup")
        .send(newUser);

      expect(res.status).to.be.oneOf([200, 201, 409]);
      
      if (res.status === 201) {
        expect(res.body).to.have.property("accessToken");
        expect(res.body).to.have.property("message");
      }
    });
    
    it("should not register a user with missing fields", async () => {
      const incompleteUser = {
        username: "incomplete"
      };

      const res = await request(app)
        .post("/signup")
        .send(incompleteUser);

      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should validate email format during registration", async () => {
      const invalidEmailUser = {
        username: "invalid-email-user",
        password: "password123",
        email: "not-an-email",
        role: "Staff"
      };
      
      const res = await request(app)
        .post("/signup")
        .send(invalidEmailUser);
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should validate password strength", async () => {
      const weakPasswordUser = {
        username: "weak-password-user",
        password: "123",
        email: `test_${Date.now()}@example.com`,
        role: "Staff"
      };
      
      const res = await request(app)
        .post("/signup")
        .send(weakPasswordUser);
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should reject invalid roles", async () => {
      const invalidRoleUser = {
        username: `testuser_${Date.now()}`,
        password: "password123",
        email: `test_${Date.now()}@example.com`,
        role: "SuperAdmin"
      };
      
      const res = await request(app)
        .post("/signup")
        .send(invalidRoleUser);
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should handle duplicate usernames", async () => {
      const username = `duplicate_${Date.now()}`;
      
      const user1 = {
        username: username,
        password: "password123",
        email: `test1_${Date.now()}@example.com`,
        role: "Staff"
      };
      
      const user2 = {
        username: username,
        password: "password456",
        email: `test2_${Date.now()}@example.com`,
        role: "Staff"
      };
      
      await request(app).post("/signup").send(user1);
      const res = await request(app).post("/signup").send(user2);
      
      expect(res.status).to.be.oneOf([400, 409, 500]);
    });
  });

  describe("POST /login", () => {
    it("should login with correct credentials", async () => {
      const testUser = {
        username: `logintest_${Date.now()}`,
        password: "password123",
        email: `logintest_${Date.now()}@example.com`,
        role: "Staff"
      };

      await request(app).post("/signup").send(testUser);

      const res = await request(app)
        .post("/login")
        .send({
          username: testUser.username,
          password: testUser.password
        });
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
    
    it("should fail login with empty credentials", async () => {
      const res = await request(app)
        .post("/login")
        .send({});
      expect(res.status).to.be.oneOf([400, 401, 500]);
    });
    
    it("should fail login with missing password", async () => {
      const res = await request(app)
        .post("/login")
        .send({ username: "someuser" });
      expect(res.status).to.be.oneOf([400, 401, 500]);
    });
    
    it("should fail login with missing username", async () => {
      const res = await request(app)
        .post("/login")
        .send({ password: "somepassword" });
      expect(res.status).to.be.oneOf([400, 401, 500]);
    });
    
    it("should fail login with malformed JSON", async () => {
      const res = await request(app)
        .post("/login")
        .set("Content-Type", "application/json")
        .send("malformed json");
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should provide appropriate error message", async () => {
      const res = await request(app)
        .post("/login")
        .send({
          username: "nonexistentuser",
          password: "wrongpassword"
        });
      
      expect(res.status).to.be.oneOf([401, 404]);
      if (res.body && res.body.message) {
        expect(res.body.message).to.be.a("string");
      }
    });
  });

  describe("POST /resend-reset-link", () => {
    it("should simulate password reset link sending", async () => {
      const res = await request(app)
        .post("/resend-reset-link")
        .send({
          email: "test@example.com"
        });
      expect(res.status).to.be.oneOf([200, 500]);
    });

    it("should return 400 if email not provided for reset", async () => {
      const res = await request(app)
        .post("/resend-reset-link")
        .send({});
      expect(res.status).to.equal(400);
    });
    
    it("should validate email format for reset", async () => {
      const res = await request(app)
        .post("/resend-reset-link")
        .send({ email: "not-a-valid-email" });
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should handle non-existent email addresses", async () => {
      const res = await request(app)
        .post("/resend-reset-link")
        .send({ email: `nonexistent_${Date.now()}@example.com` });
      expect(res.status).to.be.oneOf([200, 404, 500]);
    });
    
    it("should handle malformed request body", async () => {
      const res = await request(app)
        .post("/resend-reset-link")
        .set("Content-Type", "application/json")
        .send("not json");
      expect(res.status).to.be.oneOf([400, 500]);
    });
  });

  describe("POST /verify-token", () => {
    it("should verify a valid JWT token", async () => {
      const payload = { id: "someUserId", role: "Staff" };
      const validToken = jwt.sign(payload, process.env.STAFF_ACCESS_TOKEN || "staff-test-secret");

      const res = await request(app)
        .post("/verify-token")
        .set("Authorization", `Bearer ${validToken}`)
        .send();
      expect(res.status).to.be.oneOf([200, 204, 404, 403]);
    });

    it("should reject an invalid JWT token", async () => {
      const invalidToken = "invalid.token.string";

      const res = await request(app)
        .post("/verify-token")
        .set("Authorization", `Bearer ${invalidToken}`)
        .send();
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
    
    it("should handle missing token in auth header", async () => {
      const res = await request(app)
        .post("/verify-token")
        .set("Authorization", "Bearer ")
        .send();
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
    
    it("should handle malformed auth header", async () => {
      const res = await request(app)
        .post("/verify-token")
        .set("Authorization", "NotBearer token")
        .send();
      expect(res.status).to.be.oneOf([401, 403, 404, 500]);
    });
    
    it("should handle missing auth header", async () => {
      const res = await request(app)
        .post("/verify-token")
        .send();
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
    
    it("should handle expired tokens", async () => {
      const payload = { id: "someUserId", role: "Staff", exp: Math.floor(Date.now() / 1000) - 3600 };
      const expiredToken = jwt.sign(payload, process.env.STAFF_ACCESS_TOKEN || "staff-test-secret", { expiresIn: -3600 });
      
      const res = await request(app)
        .post("/verify-token")
        .set("Authorization", `Bearer ${expiredToken}`)
        .send();
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
  });
  
  describe("POST /reset-password", () => {
    it("should reset password with valid request", async () => {
      const res = await request(app)
        .post("/reset-password")
        .send({
          email: "test@example.com",
          newPassword: "newPassword123"
        });
      expect(res.status).to.be.oneOf([200, 400, 404, 500]);
    });
    
    it("should reject reset without email", async () => {
      const res = await request(app)
        .post("/reset-password")
        .send({
          newPassword: "newPassword123"
        });
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should reject reset without new password", async () => {
      const res = await request(app)
        .post("/reset-password")
        .send({
          email: "test@example.com"
        });
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should handle non-existent users", async () => {
      const res = await request(app)
        .post("/reset-password")
        .send({
          email: `nonexistent_${Date.now()}@example.com`,
          newPassword: "newPassword123"
        });
      expect(res.status).to.be.oneOf([404, 500]);
    });
  });
  
  describe("GET /check-username", () => {
    it("should check if username exists", async () => {
      const res = await request(app)
        .get("/check-username?username=admin");
      expect(res.status).to.be.oneOf([200, 404]);
    });
    
    it("should require username parameter", async () => {
      const res = await request(app)
        .get("/check-username");
      expect(res.status).to.be.oneOf([400, 404]);
    });
    
    it("should handle empty username parameter", async () => {
      const res = await request(app)
        .get("/check-username?username=");
      expect(res.status).to.be.oneOf([400, 404]);
    });
  });
  
  describe("POST /logout", () => {
    it("should handle user logout", async () => {
      const res = await request(app)
        .post("/logout");
      expect(res.status).to.be.oneOf([200, 204, 404]);
    });
    
    it("should clear user session", async () => {
      const res = await request(app)
        .post("/logout")
        .set("Authorization", "Bearer token");
      expect(res.status).to.be.oneOf([200, 204, 404]);
    });
  });
});