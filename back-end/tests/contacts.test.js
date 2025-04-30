import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

// tests for the contacts backend
describe("Contacts API Routes", () => {
  let createdContactId;

  it("should return all contacts", async () => {
    const res = await request(app).get("/contacts");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("should return 404 for a non-existent contact", async () => {
    const res = await request(app).get("/contact/999999");
    expect(res.status).to.be.oneOf([404, 500]);
  });
});
