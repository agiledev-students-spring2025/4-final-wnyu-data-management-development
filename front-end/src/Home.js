import React, { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = ({ onAlbumClick }) => {
  const [newlyAddedAlbums, setNewlyAddedAlbums] = useState([]);
  const [staffFavorites, setStaffFavorites] = useState([]);
  const [searchType, setSearchType] = useState("artist");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNew = await fetch(
          `${process.env.REACT_APP_API_URL}api/albums/new`
        );
        // const resNew = await fetch("http://localhost:8080/api/albums/new");
        const resStaff = await fetch(
          `${process.env.REACT_APP_API_URL}api/albums/staff-favorites`
        );
        // const resStaff = await fetch(
        //   "http://localhost:8080/api/albums/staff-favorites"
        // );
        const newData = await resNew.json();
        const staffData = await resStaff.json();
        setNewlyAddedAlbums(newData);
        setStaffFavorites(staffData);
      } catch (err) {
        console.error("Failed to fetch albums:", err);
      }
    };

    fetchData();
  }, []);

  const useInfiniteScroll = (scrollRef) => {
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      const scrollAmount = 0.5; // How many pixels to scroll per step
      const scrollSpeed = 30; // How often to scroll (ms between each scroll)

      let scrollInterval = null;

      const startScrolling = () => {
        stopScrolling(); // clear any existing interval

        scrollInterval = setInterval(() => {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
          scrollContainer.scrollLeft += scrollAmount;
        }, scrollSpeed);
      };

      const stopScrolling = () => {
        if (scrollInterval) {
          clearInterval(scrollInterval);
          scrollInterval = null;
        }
      };

      startScrolling();
      scrollContainer.addEventListener("mouseenter", stopScrolling);
      scrollContainer.addEventListener("mouseleave", startScrolling);

      return () => {
        stopScrolling();
        scrollContainer.removeEventListener("mouseenter", stopScrolling);
        scrollContainer.removeEventListener("mouseleave", startScrolling);
      };
    }, [scrollRef]);
  };

  useInfiniteScroll(scrollRef1);
  useInfiniteScroll(scrollRef2);

  const extendedNewlyAdded = [...newlyAddedAlbums, ...newlyAddedAlbums];
  const extendedStaffFavorites = [...staffFavorites, ...staffFavorites];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search?type=${searchType}&query=${encodeURIComponent(
          searchQuery.trim()
        )}`
      );
    }
  };

  return (
    <div className="home-container">
      <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder={`Search by ${searchType}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="search-select"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="artist">Artist</option>
            <option value="title">Album Title</option>
          </select>
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      <div className="slider-section">
        <h2 className="slider-title">Newly Added</h2>
        <div className="scroll-container" ref={scrollRef1}>
          <div className="scroll-wrapper">
            {extendedNewlyAdded.map((album, index) => (
              <Link
                to={`/album/${album.id}`}
                key={index}
                onClick={() => onAlbumClick(album)}
              >
                <div className="album-item">
                  <div className="album-meta">
                    <span
                      className={`album-format-box album-format-${album.format
                        ?.toLowerCase()
                        .replace(/\s+/g, "")}`}
                    >
                      {album.format}
                    </span>
                    <span className="album-release-year">
                      {album.releaseDate?.slice(0, 4) || "—"}
                    </span>
                  </div>
                  <img
                    src={album.imageUrl || "/default-album-cover.png"}
                    alt={album.title}
                    className="album-image"
                  />
                  <div className="album-details">
                    <h3 className="album-title">{album.title}</h3>
                    <p className="album-artist">{album.artist}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="slider-section">
        <h2 className="slider-title">Staff Favorites</h2>
        <div className="scroll-container" ref={scrollRef2}>
          <div className="scroll-wrapper">
            {extendedStaffFavorites.map((album, index) => (
              <Link
                to={`/album/${album.id}`}
                key={index}
                onClick={() => onAlbumClick(album)}
              >
                <div className="album-item">
                  <div className="album-meta">
                    <span
                      className={`album-format-box album-format-${album.format
                        ?.toLowerCase()
                        .replace(/\s+/g, "")}`}
                    >
                      {album.format}
                    </span>
                    <span className="album-release-year">
                      {album.releaseDate?.slice(0, 4) || "—"}
                    </span>
                  </div>
                  <img
                    src={album.imageUrl || "/default-album-cover.png"}
                    alt={album.title}
                    className="album-image"
                  />
                  <div className="album-details">
                    <h3 className="album-title">{album.title}</h3>
                    <p className="album-artist">{album.artist}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
