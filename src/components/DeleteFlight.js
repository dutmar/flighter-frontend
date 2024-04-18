import React, { useState } from "react";
import '../styles/addFlight.css'
import Navbar from "./Navbar";
import apiClient from "../services/api";

const DeleteFlight = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [flights, setFlights] = React.useState([]);

    const handleId = async () => {
        try {
            const response = await apiClient.get('/api/search', {
                params: {
                    origin: origin,
                    destination: destination
                }
            });
            setFlights(response.data)
        } catch (error) {
            console.error('Failed', error.response.data);
        }
    };

    const handleDelete = (id) => {
        try {
            apiClient.post('/api/delete', {
                id: id
            });
        } catch (error) {
            console.error('Failed', error.response.data);
        }

        const updatedItems = flights.filter(flight => flight.id !== id);
        setFlights(updatedItems);
    };

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
            <div>
                ID: {flight.id}
            </div>
            <button onClick={() => handleDelete(flight.id)}>DELETE</button>
        </div>
    )

    return (
        <div>
            <Navbar/>

            <div className="addFlight-box">
                <input placeholder="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}></input>
                <input placeholder="destination" value={destination} onChange={(e) => setDestination(e.target.value)}></input>
                <button onClick={handleId}>Find ID</button>
            </div>

            <div className="flight-list">
                {flightsList}
            </div>
        </div>
        
    )
}

export default DeleteFlight;