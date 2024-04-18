import React, { useState } from "react";
import '../styles/addFlight.css'
import Navbar from "./Navbar";
import apiClient from "../services/api";

const AddFlight = () => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [airline, setAirline] = useState('');
    const [price, setPrice] = useState('');
    const [seats, setSeats] = useState('');

    const handleAdd = async () => {
        try {
            const response = await apiClient.post('/api/add', {
                origin: origin,
                destination: destination,
                airline: airline,
                price: price,
                noOfSeats: seats
            });
        } catch (error) {
            console.error('Failed', error.response.data);
        }
    };

    return (
        <div>
            <Navbar/>
            <div className="addFlight-box">
            <input placeholder="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}></input>
            <input placeholder="destination" value={destination} onChange={(e) => setDestination(e.target.value)}></input>
            <input placeholder="airline" value={airline} onChange={(e) => setAirline(e.target.value)}></input>
            <input placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            <input placeholder="number of seats" value={seats} onChange={(e) => setSeats(e.target.value)}></input>
            <button onClick={handleAdd}>Add</button>
            </div>
        </div>
        
    )
}

export default AddFlight;