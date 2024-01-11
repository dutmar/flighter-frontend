import React from "react";
import apiClient from "../services/api";

const Search = () => {
  const[origin, setOrigin] = React.useState('');
  //const[destination, setDestination] = React.useState('');
  
  const handleSubmit = (e) => {
    apiClient.get('api/searchTest', {
      params: {
        query: origin
      }
    }).then(response => {
      console.log(response);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Origin..."
              value={origin}
              onChange={e => setOrigin(e.target.value)}
          />

          {/* <input
              type="text"
              placeholder="Destination..."
              value={destination}
              onChange={e => setDestination(e.target.value)}
          /> */}
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;