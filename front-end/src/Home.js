import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ onAlbumClick }) => {
  const [newlyAddedAlbums, setNewlyAddedAlbums] = useState([]);
  const [staffFavorites, setStaffFavorites] = useState([]);

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNew = await fetch("http://localhost:8080/api/albums/new");
        const resStaff = await fetch("http://localhost:8080/api/albums/staff-favorites");
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

      let scrollAmount = 0.5;
      let scrollInterval = null;

      const startScrolling = () => {
        if (scrollInterval) clearInterval(scrollInterval);
        scrollInterval = setInterval(() => {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0;
          }
          scrollContainer.scrollLeft += scrollAmount;
        }, 25);
      };

      const stopScrolling = () => {
        if (scrollInterval) clearInterval(scrollInterval);
      };

      startScrolling();
      scrollContainer.addEventListener("mouseenter", stopScrolling);
      scrollContainer.addEventListener("mouseleave", startScrolling);

      return () => {
        clearInterval(scrollInterval);
        scrollContainer.removeEventListener("mouseenter", stopScrolling);
        scrollContainer.removeEventListener("mouseleave", startScrolling);
      };
    }, [scrollRef]);
  };

  useInfiniteScroll(scrollRef1);
  useInfiniteScroll(scrollRef2);

  const extendedNewlyAdded = [...newlyAddedAlbums, ...newlyAddedAlbums];
  const extendedStaffFavorites = [...staffFavorites, ...staffFavorites];

  return (
    <div className="home-container">
      <div className="slider-section">
        <h2 className="slider-title">Newly Added</h2>
        <div className="scroll-container" ref={scrollRef1}>
          <div className="scroll-wrapper">
            {extendedNewlyAdded.map((album, index) => (
              <Link to={`/album/${album.id}`} key={index} onClick={() => onAlbumClick(album)}>
                <div className="album-item">
                  {/* Format box and ID */}
                  <div className="album-meta">
                    <span className={`album-format-box ${album.format === "Vinyl" ? "album-format-vinyl" : "album-format-cd"}`}>
                      {album.format}
                    </span>
                    <span className="album-id">{album.id}</span>
                  </div>

                  {/* Separator Line */}
                  <div className="separator"></div>

                  {/* Album Image */}
                  <img src={album.imageUrl} alt={album.title} className="album-image" />

                  {/* Album Details */}
                  <div className="album-details">
                    <h3 className="album-title">{album.title}</h3>
                    <p className="album-artist">{album.artist}</p>
                    <p className="album-genre">{album.genre}</p>
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
              <Link to={`/album/${album.id}`} key={index} onClick={() => onAlbumClick(album)}>
                <div className="album-item">
                  {/* Format box and ID */}
                  <div className="album-meta">
                    <span className={`album-format-box ${album.format === "Vinyl" ? "album-format-vinyl" : "album-format-cd"}`}>
                      {album.format}
                    </span>
                    <span className="album-id">{album.id}</span>
                  </div>

                  {/* Separator Line */}
                  <div className="separator"></div>

                  {/* Album Image */}
                  <img src={album.imageUrl} alt={album.title} className="album-image" />

                  {/* Album Details */}
                  <div className="album-details">
                    <h3 className="album-title">{album.title}</h3>
                    <p className="album-artist">{album.artist}</p>
                    <p className="album-genre">{album.genre}</p>
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
