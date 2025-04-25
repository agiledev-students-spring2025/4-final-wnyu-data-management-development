import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import { Album } from "../db.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp file storage

router.get("/", async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 }); // fetch all albums from MongoDB
    res.json(albums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching albums." });
  }
});

router.get("/new", async (req, res) => {
  try {
    const recentAlbums = await Album.find()
      .sort({ createdAt: -1 }) // sort newest first
      .limit(20);              // get only the latest 20

    res.json(recentAlbums);
  } catch (error) {
    console.error("Error fetching recent albums:", error);
    res.status(500).json({ message: "Error fetching recent albums" });
  }
});

router.get("/staff-favorites", async (req, res) => {
  try {
    const favorites = await Album.find({ staffFavorite: true });
    res.json(favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching staff favorites" });
  }
});

router.put("/:id/staff-favorite", async (req, res) => {
  const albumId = req.params.id;
  const { isFavorite } = req.body;

  try {
    const updated = await Album.findByIdAndUpdate(
      albumId,
      { staffFavorite: isFavorite },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating staff favorite" });
  }
});

router.post("/add", async (req, res) => {
  console.log("Incoming album data:", req.body);
  try {
    const { title, artist, genre, format, releaseDate, description, imageUrl } =
      req.body;

    const newAlbum = new Album({
      title,
      artist,
      genre,
      format,
      releaseDate,
      description,
      imageUrl, // or leave blank if no image yet
    });

    await newAlbum.save();

    res.status(201).json({ message: "Album added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding album." });
  }
});

// Add albums search endpoint
router.get("/search/:term", (req, res) => {
  const term = req.params.term.toLowerCase();
  const allAlbums = [...newlyAddedAlbums, ...staffFavorites];
  const results = allAlbums.filter(
    (album) =>
      album.title.toLowerCase().includes(term) ||
      album.artist.toLowerCase().includes(term) ||
      album.genre.toLowerCase().includes(term)
  );

  res.json(results);
});

router.post("/bulk", upload.single("file"), (req, res) => {
  const results = [];

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      fs.unlinkSync(req.file.path); // cleanup
      console.log("Parsed albums:", results);

      // TODO: Save to database or memory here
      res
        .status(200)
        .json({ message: "Albums uploaded", count: results.length });
    })
    .on("error", (err) => {
      res.status(500).json({ error: err.message });
    });
});

// Add a single album endpoint to get album by ID
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    res.json(album);
  } catch (error) {
    console.error("Error fetching album by ID:", error);
    res.status(500).json({ message: "Error fetching album." });
  }
});

export default router;
