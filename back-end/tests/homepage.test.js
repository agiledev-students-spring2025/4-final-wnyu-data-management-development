import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

describe("Homepage API Routes", () => {
  it("should return newly added albums", async () => {
    const res = await request(app).get("/api/albums/new");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    
    if (res.body.length > 0) {
      const album = res.body[0];
      expect(album).to.satisfy(a => {
        return (a.hasOwnProperty('_id') || a.hasOwnProperty('id')) &&
               a.hasOwnProperty('title') &&
               a.hasOwnProperty('artist') &&
               a.hasOwnProperty('genre') &&
               a.hasOwnProperty('format');
      });
    }
  });

  it("should return staff favorite albums", async () => {
    const res = await request(app).get("/api/albums/staff-favorites");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    
    if (res.body.length > 0) {
      const album = res.body[0];
      expect(album).to.satisfy(a => {
        return (a.hasOwnProperty('_id') || a.hasOwnProperty('id')) &&
               a.hasOwnProperty('title') &&
               a.hasOwnProperty('artist') &&
               a.hasOwnProperty('genre') &&
               a.hasOwnProperty('format');
      });
    }
  });
});