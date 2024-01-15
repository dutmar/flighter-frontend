import React from 'react';
import axios from 'axios';
import apiClient from '../services/api';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import ShoppingCart from './ShoppingCart';
import '../styles/flights.css';
 
const Flights = () => {
    const [flights, setFlights] = React.useState([]);
    const { isLoggedIn, login, logout } = useAuth();

    React.useEffect(() => {
        apiClient.get('api/flights')
        .then(response => {
            setFlights(response.data)
        })
        .catch(error => console.error(error));
    }, []);
    const flightsList = flights.map((flight) =>
        <div>
            <li key={flight.id}>{flight.origin} - {flight.destination}</li>
        </div>

    );
    //PROBA ZA LOGIN STATE, TREBA PROMJENITI!!!!!
    return (
        <div>
            <Navbar />
            {isLoggedIn ? (
                <ul className='listFlights'>{flightsList}</ul>
            ) : (
                <h1>LOG IN!!!!</h1>
            )}
        </div>
    );
    
}
 
export default Flights;