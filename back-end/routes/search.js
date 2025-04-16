import express from 'express';
import { Album } from '../db.js';

const router = express.Router();

router.get("/", async (req, res) => {
  const { type, query } = req.query;

  if (!type || !query) {
    return res.status(400).json({ error: "Missing type or query parameter" });
  }

  const searchField = type === "artist" ? "artist" : "title";

  try {
    // Case-insensitive regex search
    const albums = await Album.find({
      [searchField]: { $regex: query, $options: "i" }
    });

    res.json(albums);
  } catch (error) {
    console.error("Error fetching albums:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;