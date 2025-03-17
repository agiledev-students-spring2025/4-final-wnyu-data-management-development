import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ newlyAddedAlbums, staffFavorites, onAlbumClick }) => {
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  // Custom Hook for Infinite Scrolling with Pause on Hover
  const useInfiniteScroll = (scrollRef) => {
    useEffect(() => {
      const scrollContainer = scrollRef.current;
      if (!scrollContainer) return;

      let scrollAmount = 0.5; // Speed of scrolling
      let scrollInterval;

      const startScrolling = () => {
        scrollInterval = setInterval(() => {
          if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
            scrollContainer.scrollLeft = 0; // Reset for infinite loop
          }
          scrollContainer.scrollLeft += scrollAmount;
        }, 25);
      };

      const stopScrolling = () => clearInterval(scrollInterval);

      // Start scrolling on load
      startScrolling();

      // Pause when hovered, resume on leave
      scrollContainer.addEventListener("mouseenter", stopScrolling);
      scrollContainer.addEventListener("mouseleave", startScrolling);

      return () => {
        clearInterval(scrollInterval);
        scrollContainer.removeEventListener("mouseenter", stopScrolling);
        scrollContainer.removeEventListener("mouseleave", startScrolling);
      };
    }, [scrollRef]);
  };

  // Apply the scrolling effect to both album sections
  useInfiniteScroll(scrollRef1);
  useInfiniteScroll(scrollRef2);

  // Duplicate albums to create seamless looping effect
  const extendedNewlyAdded = [...newlyAddedAlbums, ...newlyAddedAlbums];
  const extendedStaffFavorites = [...staffFavorites, ...staffFavorites];
  return (
    <div className="home-container">
      {/* Newly Added Section */}
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
                  <img src={album.imageUrl} alt={album.title} />
                  <div className="album-details">
                    <h3 className="album-title">{album.title}</h3>
                    <p className="album-artist">{album.artist}</p>
                    <p className="album-genre">{album.genre}</p>
                    <p className="album-format">{album.format}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Staff Favorites Section */}
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
                  <img src={album.imageUrl} alt={album.title} />
                  <div className="album-details">
                    <h3 className="album-title">{album.title}</h3>
                    <p className="album-artist">{album.artist}</p>
                    <p className="album-genre">{album.genre}</p>
                    <p className="album-format">{album.format}</p>
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
