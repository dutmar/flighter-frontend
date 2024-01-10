import React from "react";
import apiClient from "../services/api";

const Search = ({ data, onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      onSearch(searchTerm);
    };

    return (
      <div>
        <form onSubmit={handleSearchChange}>
            <input
                type="text"
                placeholder="Origin..."
                value={origin}
                onChange={e => setOrigin(e.target.value)}
            />

            <input
                type="text"
                placeholder="Destination..."
                value={destination}
                onChange={e => setDestination(e.target.value)}
            />
          <button type="submit">Search</button>
        </form>
      </div>
    );
}

export default Search;