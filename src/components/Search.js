import React from "react";
import apiClient from "../services/api";

const Search = () => {
  const[origin, setOrigin] = React.useState('');
  const[destination, setDestination] = React.useState('');
  const [flights, setFlights] = React.useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    apiClient.get('api/search', {
      params: {
        origin: origin,
        destination: destination
      }
    })
    .then(response => {
      setFlights(response.data)
    })
    .catch(error => console.error(error));
  }
  
  //OVO RADI!!!!!
  // React.useEffect(() => {
  //   apiClient.get('api/search?query=${origin}', {
  //   })
  //   .then(response => {
  //     setFlights(response.data)
  //   })
  //   .catch(error => console.error(error));
  // }, []);
  
  const flightsList = flights.map((flight) =>
        <li key={flight.id}>
          <div>
          {flight.origin} - {flight.destination}
          </div>
          <div>
            {flight.airline}
          </div>
          <div>
            {flight.price}$
          </div>
          <button>Add to cart</button>
        </li>
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

          <input
              type="text"
              placeholder="Destination..."
              value={destination}
              onChange={e => setDestination(e.target.value)}
          />
        <button type="submit">Search</button>
      </form>

      {flightsList.length > 0 ? (
        <ul>{flightsList}</ul>
      ) : (
        <h1>No flights for that route</h1>
      )}
    </div>
  );
}

export default Search;