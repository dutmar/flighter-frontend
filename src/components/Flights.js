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
    const uniqueValues = new Set();

    React.useEffect(() => {
        apiClient.get('api/flights')
        .then(response => {
            setFlights(response.data)
        })
        .catch(error => console.error(error));
    }, []);
    // const flightsList = flights.map((flight) =>
    //     <div className='flight-in-list'>
    //         <li key={flight.id}>{flight.airline}</li>
    //     </div>
    // );

    const values = flights.map((flight) => {
        if(!uniqueValues.has(flight.airline)) {
            uniqueValues.add(flight.airline);
        }
    })

    const airlines  = [...uniqueValues];

    const flightsList = airlines.map((airline) =>
        <div className='flight-in-list'>
            <li>{airline}</li>
        </div>
    );

    return (
        <div>
            <Navbar />
            <Footer/>
            <div className='flight-list'>{flightsList}</div>
        </div>
    );
    
}
 
export default Flights;