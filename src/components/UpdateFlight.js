import React, { useState } from "react";
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
    const nav = useNavigate();

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
            <div className="addFlight-box">
                <input placeholder="origin" value={origin} onChange={(e) => setOrigin(e.target.value)}></input>
                <input placeholder="destination" value={destination} onChange={(e) => setDestination(e.target.value)}></input>
                <input placeholder="airline" value={airline} onChange={(e) => setAirline(e.target.value)}></input>
                <input placeholder="price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                <input placeholder="number of seats" value={seats} onChange={(e) => setSeats(e.target.value)}></input>
                <input placeholder="flight id" value={id} onChange={(e) => setId(e.target.value)}></input>
                <button onClick={handleUpdate}>Update</button>
            </div>
        </div>
        
    )
}

export default UpdateFlight;