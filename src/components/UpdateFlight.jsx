import React, { useState, useEffect } from "react";
import '../styles/addFlight.css'
import Navbar from "./Navbar";
import apiClient from "../services/api";
import { useNavigate } from 'react-router-dom';

const UpdateFlight = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [airline, setAirline] = useState('');
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState('');
    const [id, setId] = useState('');
    const [flights, setFlights] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        const handleDisplayFlights = async () => {
            try {
                const response = await apiClient.get('/api/search', {
                    params: {
                        origin: '',
                        destination: ''
                    }
                });
                setFlights(response.data)
            } catch (error) {
                console.error('Failed', error.response.data);
            }
        }

        handleDisplayFlights();
    }, []);

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
                {flight.noOfSeats}
            </div>
            <div>
                ID: {flight.id}
            </div>
        </div>
    )

    const handleUpdate = async () => {
        try {
            const response = await apiClient.put('/api/update/'+id, {
                origin: origin,
                destination: destination,
                airline: airline,
                price: price,
                noOfSeats: seats
            });
            nav('/')
        } catch (error) {
            console.error('Failed', error.response.data);
        }
    }

    return (
        <div>
            <Navbar/>
            <div className="update-container">
                <div className="addFlight-box-update">
                    <input placeholder="flight id" value={id} onChange={(e) => setId(e.target.value)}></input>
                    <input placeholder="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}></input>
                    <input placeholder="destination" value={destination} onChange={(e) => setDestination(e.target.value)}></input>
                    <input placeholder="airline" value={airline} onChange={(e) => setAirline(e.target.value)}></input>
                    <input placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                    <input placeholder="seats" value={seats} onChange={(e) => setSeats(e.target.value)}></input>
                    <button className="buy-button" onClick={handleUpdate}>Update</button>
                </div>
                <div className="flight-list-update">
                    {flightsList}
                </div>
            </div>
        </div>
        
    )
}

export default UpdateFlight;