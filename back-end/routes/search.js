const express = require("express");
const router = express.Router();

// Sample mock data or replace with your DB model query
const albums = require("../data/albums"); // replace with DB query

router.get("/", (req, res) => {
  const { type, query } = req.query;

  if (!type || !query) {
    return res.status(400).json({ error: "Missing type or query parameter" });
  }

  const searchField = type === "artist" ? "artist" : "title";

  const filtered = albums.filter((album) =>
    album[searchField]?.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filtered);
});

module.exports = router;