import React from 'react';
import axios from 'axios';
import apiClient from '../services/api';
import Navbar from './Navbar';
 
const Flights = (props) => {
    const [flights, setFlights] = React.useState([]);
    React.useEffect(() => {
        apiClient.get('api/flights')
        .then(response => {
            setFlights(response.data)
        })
        .catch(error => console.error(error));
    }, []);
    const flightsList = flights.map((flight) =>
        <li key={flight.id}>{flight.origin} - {flight.destination}</li>
    );
    
    return (
        <div>
            <Navbar />
            <ul>{flightsList}</ul>
        </div>
    );
    
}
 
export default Flights;