import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/planeLogo.png';
import shoppingCart from '../img/shopping-cart.png';
import '../styles/navbar.css';
import { useAuth } from './AuthContext';
import apiClient from '../services/api';

const Navbar = () => {
    const { isLoggedIn, login, logout } = useAuth();
    // const [userName, setUserName] = React.useState([]);

    // useEffect(() => {
    //     const getUserName = async () => {
    //         try {
    //             const response = await apiClient.get('/api/user');

    //             setUserName(response.data.name);
    //         } catch(error) {
    //             console.error("error feteching user name:", error.message);
    //         }
    //     };

    //     getUserName();
    // }, []);

    const handleSubmit = () => {
        logout();
    }

  return (
    <nav>
        <div>
            <a href="/">
                <img src={logo} alt='Logo' width={70} height={64} style={{ borderRadius: '50%' }} ></img>
            </a>
        </div>

        <div className='links'>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/flights">Flights</NavLink>
                </li>
                <li>
                    <NavLink to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
            </ul>
        </div>

        {isLoggedIn ? (
            <div className='links-loggedIn'>
                <div>UserName{/*{userName}*/}</div>
                <a href='/cart'>
                    <img src={shoppingCart} alt='Cart' width={40} height={40}></img>
                </a>
                <button onClick={handleSubmit}>Logout</button>
            </div>

        ) : (
            <div className='links'>
            <ul>
                <li>
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register">Register</NavLink>
                </li>
            </ul>
        </div>
        )}
        
    </nav>
  );
};

export default Navbar;