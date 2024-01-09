import React from 'react';
import axios from 'axios';
import apiClient from '../services/api';
 
const Flights = (props) => {
    const [flights, setFlights] = React.useState([]);
    React.useEffect(() => {
        if(props.loggedIn) {
            apiClient.get('api/flights')
            .then(response => {
                setFlights(response.data)
            })
            .catch(error => console.error(error));
        }
    }, []);
    const flightsList = flights.map((flight) =>
        <li key={flight.id}>{flight.origin} - {flight.destination}</li>
    );
    
    if(props.loggedIn) {
        return (
            <ul>{flightsList}</ul>
        );
    }
    
    return (
        <div>You are not logged in</div>
    );
}
 
export default Flights;