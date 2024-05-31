import React, { useEffect } from "react";
import apiClient from "../services/api";
import { useAuth } from './AuthContext';
import '../styles/search.css'
import ImageSlider from "./ImageSlider";

const Search = () => {
  const [origin, setOrigin] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [flights, setFlights] = React.useState([]);//svi letovi nakon pritiska na button fly
  const [isSubmitted, setSubmitted] = React.useState(false);
  const { isLoggedIn, login, logout } = useAuth();
  const [flightsInCart, setFlightsInCart] = React.useState(JSON.parse(localStorage.getItem('cart')) || []);//letovi koji dodamo u cart

  const destinationImages = [
    'https://media.cntraveler.com/photos/655cdf1d2d09a7e0b27741b5/16:9/w_2560%2Cc_limit/Cairo%2520Egypt_GettyImages-1370918272.jpg',
    'https://assets-global.website-files.com/62200394843406293f033f05/62aa3477353beb24e56e68be_attractions-of-split.jpeg',
    'https://traveler.marriott.com/wp-content/uploads/2023/07/GettyImages-1082428738.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/640px-London_Skyline_%28125508655%29.jpeg',
    'https://media.tatler.com/photos/6141d37b9ce9874a3e40107d/16:9/w_2560%2Cc_limit/social_crop_sydney_opera_house_gettyimages-869714270.jpg'
  ]

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

      {!isSubmitted && 
        <div className="image-slider">
          <ImageSlider images={destinationImages} interval={4000}/>
        </div>}

      {!isSubmitted && (
        <div className="text-container">
          <div className="why-us-container">
            <h2>Why us?</h2>
            <p>At Flighter, we strive to offer the most competitive prices 
              in the market. Our advanced search algorithms compare thousands 
              of flights from hundreds of airlines to ensure you get the best deals. 
              Plus, with our price match guarantee, you can book with confidence knowing 
              you're getting the lowest fare.
              Our intuitive website and mobile app make booking your flight quick and easy. 
              With user-friendly navigation, detailed filters, and a seamless checkout process, 
              finding and booking your next flight is a breeze.
            </p>
          </div>
          <div className="our-team-container">
            <h2>Our team</h2>
            <p>At Flighter, we believe that exceptional service begins with an 
              exceptional team. Our dedicated team members are passionate about travel and 
              committed to making your booking experience smooth and enjoyable. 
            </p>
          </div>
        </div>
      )}

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