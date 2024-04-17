import React from "react";
import '../styles/addFlight.css'
import Navbar from "./Navbar";

const DeleteFlight = () => {

    return (
        <div>
            <Navbar/>
            <div className="addFlight-box">
            <input placeholder="origin"></input>
            <input placeholder="destination"></input>
            <input placeholder="airline"></input>
            <input placeholder="price"></input>
            <input placeholder="number of seats"></input>
            <button>Delete</button>
            </div>
        </div>
        
    )
}

export default DeleteFlight;