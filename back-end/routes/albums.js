import express from "express";

const router = express.Router();

const newlyAddedAlbums = [
  { id: 1, title: "Bitches Brew 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 2, title: "Bitches Brew 2", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 3, title: "Bitches Brew 3", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 4, title: "Bitches Brew 4", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 5, title: "Bitches Brew 5", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 6, title: "Bitches Brew 6", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 7, title: "Bitches Brew 7", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 8, title: "Bitches Brew 8", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
];
  
const staffFavorites = [
  { id: 13, title: "Staff Favorite 1", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 14, title: "Staff Favorite 2", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 15, title: "Staff Favorite 3", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 16, title: "Staff Favorite 4", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 17, title: "Staff Favorite 5", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 18, title: "Staff Favorite 6", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 19, title: "Staff Favorite 7", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
  { id: 20, title: "Staff Favorite 8", imageUrl: "/bitchesbrew.png", artist: "Miles Davis", genre: "Jazz", format: "Vinyl" },
];

router.get("/new", (req, res) => {
  res.json(newlyAddedAlbums);
});
  
router.get("/staff-favorites", (req, res) => {
  res.json(staffFavorites);
});

// Add a single album endpoint to get album by ID
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const allAlbums = [...newlyAddedAlbums, ...staffFavorites];
  const album = allAlbums.find(a => a.id === id);
  
  if (album) {
    res.json(album);
  } else {
    res.status(404).json({ message: "Album not found" });
  }
});

// Add albums search endpoint
router.get("/search/:term", (req, res) => {
  const term = req.params.term.toLowerCase();
  const allAlbums = [...newlyAddedAlbums, ...staffFavorites];
  const results = allAlbums.filter(album => 
    album.title.toLowerCase().includes(term) || 
    album.artist.toLowerCase().includes(term) ||
    album.genre.toLowerCase().includes(term)
  );
  
  res.json(results);
});

export default router;