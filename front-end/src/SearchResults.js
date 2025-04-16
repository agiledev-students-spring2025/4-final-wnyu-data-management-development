import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const searchType = queryParams.get("type");
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/search?type=${searchType}&query=${searchQuery}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchType, searchQuery]);

  return (
    <div className="search-results-page">
      <h2>Search Results for “{searchQuery}”</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul className="search-results-list">
          {results.map((album) => (
            <li key={album.id}>
              <img src={album.imageUrl} alt={album.title} style={{ height: 80 }} />
              <div>{album.title} by {album.artist}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;