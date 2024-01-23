import React from 'react';
import axios from 'axios';
import apiClient from '../services/api';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import ShoppingCart from './ShoppingCart';
import '../styles/flights.css';
import Footer from './Footer';
 
const Flights = () => {
    const [flights, setFlights] = React.useState([]);
    // const { isLoggedIn, login, logout } = useAuth();

    React.useEffect(() => {
        apiClient.get('api/flights')
        .then(response => {
            setFlights(response.data)
        })
        .catch(error => console.error(error));
    }, []);
    const flightsList = flights.map((flight) =>
        <div>
            <li key={flight.id}>{flight.airline}</li>
        </div>

    );
    //PROBA ZA LOGIN STATE, TREBA PROMJENITI!!!!!
    return (
        <div>
            <Navbar />
            <Footer/>
            <ul className='listFlights'>{flightsList}</ul>
        </div>
    );
    
}
 
export default Flights;