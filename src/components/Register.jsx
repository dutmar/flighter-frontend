import React, { useState } from 'react';
import axios from 'axios';
import apiClient from '../services/api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../styles/register.css'

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');
  const nav = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await apiClient.post('/api/register', {
        name,
        email,
        password,
        password_confirmation
      });
      setTimeout(() => {
        nav('/login');
      }, 1000);
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // Handle error, show an error message, etc.
    }
  };

  return (
    <div>
      <Navbar/>
      <h1 className='title'>Register</h1>
        <form>
          <div className='form-container'>
            <input className='form-input' type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input className='form-input' type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='form-input' type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className='form-input' type="password" placeholder='Confirm password' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />

            <button className='buy-button press' type="button" onClick={handleRegister}>
              Register
            </button>
          </div> 
        </form>
      <Footer/>
    </div>
  );
};

export default Register;