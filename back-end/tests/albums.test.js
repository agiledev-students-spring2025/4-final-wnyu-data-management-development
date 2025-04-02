import request from "supertest";
import app from "../app.js";
import { expect } from "chai";

describe("Albums API Routes", () => {
  // test for getting newly added albums
  describe("GET /api/albums/new", () => {
    it("should return newly added albums with status 200", async () => {
      const res = await request(app).get("/api/albums/new");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.length.at.least(1);
      expect(res.body[0]).to.have.keys(["id", "title", "artist", "genre", "format", "imageUrl"]);
    });

    it("should return albums with correct data types", async () => {
      const res = await request(app).get("/api/albums/new");
      const album = res.body[0];
      expect(album.id).to.be.a("number");
      expect(album.title).to.be.a("string");
      expect(album.artist).to.be.a("string");
      expect(album.genre).to.be.a("string");
      expect(album.format).to.be.a("string");
      expect(album.imageUrl).to.be.a("string");
    });
  });

  // test for getting staff favorite albums
  describe("GET /api/albums/staff-favorites", () => {
    it("should return staff favorite albums with status 200", async () => {
      const res = await request(app).get("/api/albums/staff-favorites");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.length.at.least(1);
      expect(res.body[0]).to.have.keys(["id", "title", "artist", "genre", "format", "imageUrl"]);
    });

    it("should return staff favorite albums with correct data types", async () => {
      const res = await request(app).get("/api/albums/staff-favorites");
      const album = res.body[0];
      expect(album.id).to.be.a("number");
      expect(album.title).to.be.a("string");
      expect(album.artist).to.be.a("string");
      expect(album.genre).to.be.a("string");
      expect(album.format).to.be.a("string");
      expect(album.imageUrl).to.be.a("string");
    });
  });

  // Test for getting a single album by ID
  describe("GET /api/albums/:id", () => {
    it("should return a single album when valid ID is provided", async () => {
      const res = await request(app).get("/api/albums/1");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
      expect(res.body.id).to.equal(1);
      expect(res.body).to.have.keys(["id", "title", "artist", "genre", "format", "imageUrl"]);
    });

    it("should return 404 when invalid ID is provided", async () => {
      const res = await request(app).get("/api/albums/9999");
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("message");
      expect(res.body.message).to.equal("Album not found");
    });
  });

  // Test for searching albums
  describe("GET /api/albums/search/:term", () => {
    it("should return matching albums when search term is found", async () => {
      const res = await request(app).get("/api/albums/search/Miles");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.at.least(1);
      // All returned albums should have Miles Davis as the artist
      res.body.forEach(album => {
        expect(album.artist.toLowerCase()).to.include("miles");
      });
    });

    it("should return empty array when no matches found", async () => {
      const res = await request(app).get("/api/albums/search/NonExistentArtist");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body).to.have.length(0);
    });

    it("should be case insensitive", async () => {
      const res = await request(app).get("/api/albums/search/miles");
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("array");
      expect(res.body.length).to.be.at.least(1);
    });
  });
});

