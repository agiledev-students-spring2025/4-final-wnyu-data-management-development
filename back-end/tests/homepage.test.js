import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

describe("Homepage API Routes", () => {
  it("should return newly added albums", async () => {
    const res = await request(app).get("/api/albums/new");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.keys(["id", "title", "artist", "genre", "format", "imageUrl"]);
  });

  it("should return staff favorite albums", async () => {
    const res = await request(app).get("/api/albums/staff-favorites");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body[0]).to.have.keys(["id", "title", "artist", "genre", "format", "imageUrl"]);
  });
  

  
});