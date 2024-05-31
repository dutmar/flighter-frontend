import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import AddFlight from "./AddFlight";
import '../styles/homePage.css'
import { useNavigate } from 'react-router-dom';
import planeBody from '../img/planeBody.jpg'
import { useAuth } from './AuthContext';
import '../styles/admin.css'

const HomePage = () => {
    const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem("admin")));
    const { isLoggedIn, login, logout } = useAuth();
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

    const handleUsers = () => {
        nav("/users");
    }

    return (
        <div>
            <Navbar/>
            <Footer/>

            {admin == 'true' && isLoggedIn ? (
                <div className="admin-buttons">
                    <button className="buy-button" onClick={handleAdd}>Add flights</button>
                    <button className="buy-button" onClick={handleUpdate}>Update flights</button>
                    <button className="buy-button" onClick={handleDelete}>Delete flights</button>
                    <button className="buy-button" onClick={handleTickets}>Tickets</button>
                    <button className="buy-button" onClick={handleUsers}>Users</button>
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