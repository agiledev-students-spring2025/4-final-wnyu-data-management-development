import React, { useRef, useEffect } from "react";
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = ({ newlyAddedAlbums, staffFavorites, expandedAlbum, onAlbumClick }) => {
  <div>
    <h2>Newly Added Albums</h2>
    <div className="albums">
      {newlyAddedAlbums.map((album) => (
        <Link to={`/album/${album.id}`} key={album.id} onClick={() => onAlbumClick(album)}>
          <img src={album.imageUrl} alt={album.title} />
          <p>{album.title}</p>
        </Link>
      ))}
    </div>
    {/* Repeat for staffFavorites if needed */}
  </div>

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  // Function to start infinite scrolling
  const startScrolling = (scrollContainer) => {
    if (!scrollContainer) return;
    
    let scrollAmount = 1; // Pixels per frame
    let scrollInterval; 

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        // Reset scroll when reaching the duplicate point
        scrollContainer.scrollLeft = 0;
      }
      scrollContainer.scrollLeft += scrollAmount; // Move right
    };

    scrollInterval = setInterval(scroll, 20); // Smooth scrolling interval

    scrollContainer.addEventListener("mouseenter", () => clearInterval(scrollInterval)); // Pause on hover
    scrollContainer.addEventListener("mouseleave", () => (scrollInterval = setInterval(scroll, 20))); // Resume on leave
  };

  useEffect(() => {
    startScrolling(scrollRef1.current);
    startScrolling(scrollRef2.current);
  }, []);

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
              <div key={index} className="album-item">
                <img src={album.imageUrl} alt={album.title} />
                <h3>{album.title}</h3>
              </div>
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
              <div key={index} className="album-item">
                <img src={album.imageUrl} alt={album.title} />
                <h3>{album.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
