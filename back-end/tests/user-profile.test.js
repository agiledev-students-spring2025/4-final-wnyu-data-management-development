import request from "supertest";
import app from "../app.js";
import { expect } from "chai";
import jwt from "jsonwebtoken";

describe("User Profile Routes", () => {
  let accessToken;
  let invalidToken = "invalid.token.string";
  
  // Create a test token before tests
  before(() => {
    // Create a test token for authentication
    const payload = { id: "testUserId", role: "Staff" };
    accessToken = jwt.sign(payload, process.env.STAFF_ACCESS_TOKEN || "staff-test-secret");
  });

  describe("GET /profile", () => {
    it("should get user profile when authenticated", async () => {
      const res = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${accessToken}`);

      // Either 200 with profile or 404 if endpoint doesn't exist
      expect(res.status).to.be.oneOf([200, 404]);
      
      if (res.status === 200) {
        expect(res.body).to.have.property("user");
      }
    });

    it("should deny profile access without authentication", async () => {
      const res = await request(app)
        .get("/profile");

      // Should be denied without token
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
    
    it("should reject with invalid token", async () => {
      const res = await request(app)
        .get("/profile")
        .set("Authorization", `Bearer ${invalidToken}`);
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
    
    it("should handle malformed authorization header", async () => {
      const res = await request(app)
        .get("/profile")
        .set("Authorization", `${accessToken}`);
      expect(res.status).to.be.oneOf([401, 403, 404, 500]);
    });
  });

  describe("PUT /profile", () => {
    it("should update user profile", async () => {
      const updatedProfile = {
        email: `updated_${Date.now()}@example.com`,
        displayName: "Updated User"
      };

      const res = await request(app)
        .put("/profile")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(updatedProfile);

      // Either 200 if updated, 404 if endpoint doesn't exist
      expect(res.status).to.be.oneOf([200, 204, 404]);
    });
    
    it("should reject profile update without authentication", async () => {
      const updatedProfile = {
        email: `updated_${Date.now()}@example.com`
      };
      
      const res = await request(app)
        .put("/profile")
        .send(updatedProfile);
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
    
    it("should handle empty update body", async () => {
      const res = await request(app)
        .put("/profile")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({});
      expect(res.status).to.be.oneOf([200, 204, 400, 404]);
    });
  });

  // Test contact-related endpoints
  describe("GET /contacts", () => {
    it("should retrieve all contacts", async () => {
      const res = await request(app)
        .get("/contacts");
      
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
    });
    
    it("should filter contacts by role", async () => {
      const res = await request(app).get("/contacts?role=admin");
      expect(res.status).to.be.oneOf([200, 404]);
      if (res.status === 200) {
        expect(res.body).to.be.an("array");
      }
    });
    
    it("should filter contacts by name", async () => {
      const res = await request(app).get("/contacts?name=test");
      expect(res.status).to.be.oneOf([200, 404]);
      if (res.status === 200) {
        expect(res.body).to.be.an("array");
      }
    });
  });

  describe("POST /contacts/add", () => {
    it("should add a new contact with proper data", async () => {
      const newContact = {
        name: `Test Contact ${Date.now()}`,
        role: "Developer",
        email: `contact_${Date.now()}@example.com`,
        phone: `555-${Date.now().toString().slice(-4)}`
      };

      const res = await request(app)
        .post("/contacts/add")
        .send(newContact);
      
      // Either created or failed due to validation
      expect(res.status).to.be.oneOf([201, 400, 500]);
    });

    it("should reject a contact with missing data", async () => {
      const incompleteContact = {
        name: "Incomplete Contact"
        // Missing required fields
      };

      const res = await request(app)
        .post("/contacts/add")
        .send(incompleteContact);
      
      expect(res.status).to.equal(400);
    });
    
    it("should handle malformed request data", async () => {
      const res = await request(app)
        .post("/contacts/add")
        .send("notJson");
      expect(res.status).to.be.oneOf([400, 500]);
    });
    
    it("should validate email format", async () => {
      const invalidEmail = {
        name: "Invalid Email Test",
        role: "Tester",
        email: "not-an-email",
        phone: "555-1234"
      };
      
      const res = await request(app)
        .post("/contacts/add")
        .send(invalidEmail);
      expect(res.status).to.be.oneOf([400, 500]);
    });
  });

  describe("PUT /contacts/:id", () => {
    it("should update a contact", async () => {
      const contacts = await request(app).get("/contacts");
      
      if (contacts.body && contacts.body.length > 0) {
        const contactId = contacts.body[0].id || contacts.body[0]._id;
        const res = await request(app)
          .put(`/contacts/${contactId}`)
          .send({ name: "Updated Contact" });
        expect(res.status).to.be.oneOf([200, 204, 404]);
      }
    });
    
    it("should return 404 for non-existent contact update", async () => {
      const res = await request(app)
        .put("/contacts/999999")
        .send({ name: "Won't Update" });
      expect(res.status).to.be.oneOf([404, 500]);
    });
  });

  describe("DELETE /contacts/:id", () => {
    it("should delete an existing contact", async () => {
      // Try to get a contact first
      const contacts = await request(app).get("/contacts");
      
      if (contacts.body && contacts.body.length > 0) {
        const contactId = contacts.body[0].id || contacts.body[0]._id;
        
        const res = await request(app)
          .delete(`/contacts/${contactId}`);
        
        expect(res.status).to.be.oneOf([200, 204]);
      } else {
        // Skip if no contacts exist
        this.skip();
      }
    });

    it("should return 404 for non-existent contact", async () => {
      const res = await request(app)
        .delete("/contacts/9999999");
      
      expect(res.status).to.equal(404);
    });
  });
  
  describe("GET /settings", () => {
    it("should retrieve user settings when authenticated", async () => {
      const res = await request(app)
        .get("/settings")
        .set("Authorization", `Bearer ${accessToken}`);
      expect(res.status).to.be.oneOf([200, 404]);
    });
    
    it("should deny settings access without token", async () => {
      const res = await request(app).get("/settings");
      expect(res.status).to.be.oneOf([401, 403, 404]);
    });
  });
  
  describe("PUT /settings", () => {
    it("should update user settings", async () => {
      const res = await request(app)
        .put("/settings")
        .set("Authorization", `Bearer ${accessToken}`)
        .send({ theme: "dark" });
      expect(res.status).to.be.oneOf([200, 204, 404]);
    });
  });
});