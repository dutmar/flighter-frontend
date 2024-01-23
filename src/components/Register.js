import React, { useState } from 'react';
import axios from 'axios';
import apiClient from '../services/api';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

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
      <h1>Register</h1>
      <form>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label> Confirm password:</label>
        <input type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />

        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;