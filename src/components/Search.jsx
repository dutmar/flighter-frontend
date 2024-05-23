import React, { useEffect } from "react";
import apiClient from "../services/api";
import { useAuth } from './AuthContext';
import '../styles/search.css'

const Search = () => {
  const[origin, setOrigin] = React.useState('');
  const[destination, setDestination] = React.useState('');
  const [flights, setFlights] = React.useState([]);//svi letovi nakon pritiska na button fly
  const [isSubmitted, setSubmitted] = React.useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const [flightsInCart, setFlightsInCart] = React.useState(JSON.parse(localStorage.getItem('cart')) || []);//letovi koji dodamo u cart

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
    //localStorage.setItem('cart', JSON.stringify(flightsInCart));
  }

  useEffect(() => {
    if(flightsInCart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(flightsInCart));
    }
  }, [flightsInCart]);

  const flightsList = flights.map((flight) => 
        <div key={flight.id} className="flight-in-list">
          <div className="flight-route">
            {flight.origin} - {flight.destination}
          </div>
          <div>
            {flight.airline}
          </div>
          <div>
            {flight.price}$
          </div>
          {isLoggedIn && flight.noOfSeats > 0 ? (
            <button className="buy-button" onClick={() => handleButtonClick(flight)} >Add to cart</button>
          ): (
            <div>
              {isLoggedIn && flight.noOfSeats === 0 ? (
                <div className="error-div">
                  No seats available!
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
  );

  return (
    <div className="search-body">
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
        <button className="buy-button press-search" type="submit">Fly</button>
      </form>

      {isSubmitted ? (
        <div>
          {flightsList.length > 0 ? (
          <div className="flight-list-search">{flightsList}</div>
        ) : (
          <h1>No flights for that route</h1>
        )}
        </div>
      ) : null}
    </div>
  );
}

export default Search;