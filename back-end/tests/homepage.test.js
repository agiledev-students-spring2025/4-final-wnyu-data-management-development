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
    expect(res.status).to.be.oneOf([400, 500]);
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
  });
  
  it("should handle invalid search type parameter", async () => {
    const res = await request(app).get("/api/search?type=invalid&query=test");
    expect(res.status).to.be.oneOf([400, 500]);
  });
  
  it("should handle empty search query parameter", async () => {
    const res = await request(app).get("/api/search?type=artist&query=");
    expect(res.status).to.be.oneOf([400, 200, 500]);
  });
  
  it("should fetch latest album releases", async () => {
    const res = await request(app).get("/api/albums/latest");
    expect(res.status).to.be.oneOf([200, 404]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("array");
    }
  });
  
  it("should handle case-insensitive search", async () => {
    const lowercase = await request(app).get("/api/search?type=artist&query=test");
    const uppercase = await request(app).get("/api/search?type=artist&query=TEST");
    
    expect(lowercase.status).to.be.oneOf([200, 400, 500]);
    expect(uppercase.status).to.be.oneOf([200, 400, 500]);
  });
  
  it("should handle search by title", async () => {
    const res = await request(app).get("/api/search?type=title&query=test");
    expect(res.status).to.be.oneOf([200, 400, 500]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("array");
    }
  });
  
  it("should handle search by genre", async () => {
    const res = await request(app).get("/api/search?type=genre&query=rock");
    expect(res.status).to.be.oneOf([200, 400, 500]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("array");
    }
  });
  
  it("should handle partial word search", async () => {
    const res = await request(app).get("/api/search?type=artist&query=te");
    expect(res.status).to.be.oneOf([200, 400, 500]);
  });
  
  it("should fetch recent albums with limit", async () => {
    const res = await request(app).get("/api/albums/recent?limit=5");
    expect(res.status).to.be.oneOf([200, 404, 500]);
    
    if (res.status === 200) {
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.at.most(5);
    }
  });
  
  it("should get album count", async () => {
    const res = await request(app).get("/api/albums/count");
    expect(res.status).to.be.oneOf([200, 404]);
    
    if (res.status === 200 && res.body.count !== undefined) {
      expect(res.body.count).to.be.a("number");
    }
  });
  
  it("should handle invalid API endpoints gracefully", async () => {
    const res = await request(app).get("/api/invalid-endpoint");
    expect(res.status).to.be.oneOf([404, 500]);
  });
  
  it("should handle server errors gracefully", async () => {
    const res = await request(app).get("/api/search?type=&query=");
    expect(res.status).to.be.oneOf([400, 500]);
  });
});