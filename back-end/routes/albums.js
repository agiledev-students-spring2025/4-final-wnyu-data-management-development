import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Album } from "../db.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp file storage

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      .limit(20); // get only the latest 20

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

router.post("/bulk", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const albums = [];

  try {
    await new Promise((resolve, reject) => {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (row) => {
          albums.push({
            title: row.title,
            artist: row.artist,
            genre: row.genre,
            format: row.format,
            releaseDate: row.releaseDate,
            description: row.description,
            imageUrl: row.imageUrl || "",
          });
        })
        .on("end", resolve)
        .on("error", reject);
    });
    await Album.insertMany(albums);

    fs.unlinkSync(req.file.path);

    res.status(200).json({ message: "Albums uploaded", count: albums.length });
  } catch (error) {
    console.error("Error during bulk upload:", error);
    res.status(500).json({ error: "Failed to upload albums." });
  }
});

router.get("/bulk/template", (req, res) => {
  const templatePath = path.join(__dirname, "../templates/album-template.csv");

  // Make sure the file exists
  if (!fs.existsSync(templatePath)) {
    return res.status(404).send("Template file not found.");
  }

  res.download(templatePath, "album-template.csv");
});

// Edit an album
router.put("/:id", async (req, res) => {
  try {
    const albumId = req.params.id;
    const updatedData = req.body;

    const updatedAlbum = await Album.findByIdAndUpdate(albumId, updatedData, {
      new: true,
    });

    if (!updatedAlbum) {
      return res.status(404).json({ message: "Album not found." });
    }

    res.status(200).json(updatedAlbum);
  } catch (error) {
    console.error("Error updating album:", error);
    res.status(500).json({ message: "Error updating album." });
  }
});

// Delete an album
router.delete("/:id", async (req, res) => {
  try {
    const albumId = req.params.id;

    const deletedAlbum = await Album.findByIdAndDelete(albumId);

    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found." });
    }

    res.status(200).json({ message: "Album deleted successfully." });
  } catch (error) {
    console.error("Error deleting album:", error);
    res.status(500).json({ message: "Error deleting album." });
  }
});

export default router;
