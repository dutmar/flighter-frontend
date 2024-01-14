import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/planeLogo.png';
import '../styles/navbar.css';
import { useAuth } from './AuthContext';

const Navbar = () => {
    const { isLoggedIn, login, logout } = useAuth();

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
            <div>
                <h3>Hello User</h3>
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