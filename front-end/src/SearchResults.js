import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSearchType, setSearchType] = useState("artist");
  const [newSearchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchType = queryParams.get("type");
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}api/search?type=${searchType}&query=${searchQuery}`);
        //const res = await fetch(`http://localhost:8080/api/search?type=${searchType}&query=${searchQuery}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    setSearchQuery(searchQuery || "");
    setSearchType(searchType || "artist");

    fetchResults();
  }, [searchQuery, searchType]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/search?type=${newSearchType}&query=${encodeURIComponent(
          newSearchQuery.trim()
        )}`
      );
    }
  };

  return (
    <div className="search-results-page">
      <div className="search-results-search-header-block">
        <div className="search-results-search-bar">
          <form onSubmit={handleSearch} className="search-results-search-form">
            <input
              type="text"
              className="search-results-search-input"
              placeholder={`Search by ${newSearchType}`}
              value={newSearchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="search-results-search-select"
              value={newSearchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="artist">Artist</option>
              <option value="title">Album Title</option>
            </select>
            <button type="submit" className="search-results-search-button">Search</button>
          </form>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <div className="search-results-container">
          <h2>Search Results for “{searchQuery}”</h2>
          <div className="search-results-album-grid-wrapper">    
            <div className="search-results-album-grid">
              {results.map((album) => (
                <Link to={`/album/${album._id}`} key={album._id} className="search-results-album-link-wrapper">
                  <div className="search-results-album-item">
                  <div className="search-results-album-meta">
                    <span className={`search-results-album-format-box album-format-${album.format?.toLowerCase().replace(/\s+/g, "")}`}>
                     {album.format}
                    </span>
                    <span className="search-results-album-release-year">
                      {album.releaseDate?.slice(0, 4) || "—"}
                    </span> 
                  </div> 
                  <img
                    src={album.imageUrl || "/default-album-cover.png"}
                    alt={album.title}
                    className="search-results-album-image"
                  />
                  <div className="search-results-album-details">
                    <h3 className="search-results-album-title">{album.title}</h3>
                    <p className="search-results-album-artist">{album.artist}</p>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
