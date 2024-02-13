import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/planeLogo.jpg';
import shoppingCart from '../img/shopping-cart.png';
import '../styles/navbar.css';
import { useAuth } from './AuthContext';
import apiClient from '../services/api';

const Navbar = () => {
    const { isLoggedIn, login, logout } = useAuth();
    const [name, setName] = React.useState(JSON.parse(localStorage.getItem("profile")));

    const getName = (name) => {
        setName(name);
    }

    const handleSubmit = () => {
        logout();
    }

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('profile'))) {
            login();
        }
    }, [])

  return (
    <nav>
        <div>
            <NavLink to='/'>
                <img src={logo} alt='Logo' width={60} height={60} style={{ borderRadius: '50%' }} ></img>
            </NavLink>
        </div>

        <div className='main-links'>
            <ul className='ul-links'>
                <li className='li-links'>
                    <NavLink to="/" className='navlink'>Home</NavLink>
                </li>
                <li className='li-links'>
                    <NavLink to="/flights" className='navlink'>Flights</NavLink>
                </li>
                <li className='li-links'>
                    <NavLink to="/about" className='navlink'>About</NavLink>
                </li>
                <li className='li-links'>
                    <NavLink to="/contact" className='navlink'>Contact</NavLink>
                </li>
            </ul>
        </div>

        {isLoggedIn ? (
            <div className='links-loggedIn'>
                <ul className='ul-links-right'>
                    <li>
                        <div className='navlink'>{name}</div>
                    </li>
                    <li>
                        <NavLink to="/cart" className='navlink'>
                            <img src={shoppingCart} alt='Cart' width={30} height={30}></img>
                        </NavLink>
                    </li>
                    <li>
                        <button className='buy-button' onClick={handleSubmit}>Logout</button>
                    </li>
                </ul>
            </div>

        ) : (
        <div className='links'>
            <ul className='ul-links'>
                <li className='li-links'>
                    <NavLink to="/login" className='navlink'>Login</NavLink>
                </li>
                <li className='li-links'>
                    <NavLink to="/register" className='navlink'>Register</NavLink>
                </li>
            </ul>
        </div>
        )}
        
    </nav>
  );
};

export default Navbar;