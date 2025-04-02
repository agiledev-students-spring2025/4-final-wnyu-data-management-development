import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("Album Routes", () => {
  it("should get all albums", (done) => {
    chai.request(server)
      .get("/albums")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should get a single album by ID", (done) => {
    chai.request(server)
      .get("/albums/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id", 1);
        done();
      });
  });

  it("should add a new album", (done) => {
    const newAlbum = {
      title: "New Album",
      imageUrl: "/newalbum.png",
      artist: "New Artist",
      genre: "Pop",
      format: "CD"
    };
    chai.request(server)
      .post("/albums")
      .send(newAlbum)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("title", newAlbum.title);
        done();
      });
  });

  it("should update an existing album", (done) => {
    const updatedAlbum = {
      title: "Updated Album",
      imageUrl: "/updatedalbum.png",
      artist: "Updated Artist",
      genre: "Rock",
      format: "Vinyl"
    };
    chai.request(server)
      .put("/albums/1")
      .send(updatedAlbum)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("title", updatedAlbum.title);
        done();
      });
  });

  it("should delete an album", (done) => {
    chai.request(server)
      .delete("/albums/1")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

