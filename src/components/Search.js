import React from "react";
import apiClient from "../services/api";

const Search = () => {
  const[origin, setOrigin] = React.useState('');
  //const[destination, setDestination] = React.useState('');
  const [flights, setFlights] = React.useState([]);
  
  const handleSubmit = () => {
    apiClient.get('api/search',{}, {
      params: {
        query: origin
      }
    })
    .then(response => {
      setFlights(response.data.result);
    })
    .catch(error => console.log(error));
  };

  const flightsList = flights.map((flight) =>
        <li key={flight.id}>{flight.origin} - {flight.destination}</li>
    );

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

      <ul>{flightsList}</ul>
    </div>
  );
}

export default Search;