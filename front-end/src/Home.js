import React, { useRef, useEffect } from "react";
import "./Home.css";

const Home = ({ newlyAddedAlbums, staffFavorites }) => {
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
    }, []);
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
