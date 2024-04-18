import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import AddFlight from "./AddFlight";
import '../styles/homePage.css'
import { useNavigate } from 'react-router-dom';
import planeBody from '../img/planeBody.jpg'

const HomePage = () => {
    const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem("admin")));
    const nav = useNavigate();

    const handleAdd = () => {
        nav("/add");
    }

    const handleUpdate = () => {
        nav("/update");
    }

    const handleDelete = () => {
        nav("/delete");
    }

    const handleTickets = () => {
        nav("/tickets");
    }

    return (
        <div>
            <Navbar/>
            <Footer/>

            {admin == 'true' ? (
                <div>
                    <button onClick={handleAdd}>Add flights</button>
                    <button onClick={handleUpdate}>Update flights</button>
                    <button onClick={handleDelete}>Delete flights</button>
                    <button onClick={handleTickets}>Tickets</button>
                </div>
            ) : (
                <div>
                    <Search/>
                </div>
            )}
            
        </div>
    );
}

export default HomePage;