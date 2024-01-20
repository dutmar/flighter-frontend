import React from "react";
import apiClient from "../services/api";
import { useAuth } from './AuthContext';

const Search = () => {
  const[origin, setOrigin] = React.useState('');
  const[destination, setDestination] = React.useState('');
  const [flights, setFlights] = React.useState([]);
  const [isSubmitted, setSubmitted] = React.useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const [flightsInCart, setFlightsInCart] = React.useState([]);

  const handleSubmit = (e) => {
    setSubmitted(true);
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

  const handleButtonClick = (flightInCart) => {
    setFlightsInCart(current => [...current, flightInCart]);
  }

  localStorage.setItem('cart', JSON.stringify(flightsInCart));
  
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
          {isLoggedIn ? (
            <button onClick={() => handleButtonClick(flight)} >Add to cart</button>
          ): (
            <div></div>
          )}
          
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
        <button type="submit">Fly</button>
      </form>

      {isSubmitted ? (
        <div>
          {flightsList.length > 0 ? (
          <ul>{flightsList}</ul>
        ) : (
          <h1>No flights for that route</h1>
        )}
        </div>
      ) : null}
    </div>
  );
}

export default Search;