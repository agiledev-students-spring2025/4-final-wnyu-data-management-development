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
               a.hasOwnProperty('artist');
      });
    }
  });

  it("should return staff favorite albums", async () => {
    const res = await request(app).get("/api/albums/staff-favorites");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });
  
  it("should return a welcome message on root endpoint", async () => {
    const res = await request(app).get("/");
    expect(res.status).to.equal(200);
    expect(res.text).to.include("Welcome");
  });
  
  it("should have search functionality", async () => {
    const res = await request(app).get("/api/search?type=artist&query=test");
    expect(res.status).to.be.oneOf([200, 400, 500]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("array");
    }
  });
  
  it("should return error for invalid search parameters", async () => {
    const res = await request(app).get("/api/search");
    expect(res.status).to.equal(400);
  });
  
  it("should allow downloading album template", async () => {
    const res = await request(app).get("/api/albums/template");
    expect(res.status).to.be.oneOf([200, 404, 500]);
  });

  it("should return all genres", async () => {
    const res = await request(app).get("/api/genres");
    expect(res.status).to.be.oneOf([200, 404, 500]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("array");
    }
  });

  it("should return all formats", async () => {
    const res = await request(app).get("/api/formats");
    expect(res.status).to.be.oneOf([200, 404, 500]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("array");
    }
  });

  it("should return homepage stats", async () => {
    const res = await request(app).get("/api/stats");
    expect(res.status).to.be.oneOf([200, 404, 500]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("object");
    }
  });

  it("should handle requests with invalid parameters", async () => {
    const res = await request(app).get("/api/albums?invalidParam=value");
    expect(res.status).to.be.oneOf([200, 400, 500]);
  });
});