import React, { useState } from 'react';
import apiClient from '../services/api';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../styles/login.css'
 
const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    //const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const { isLoggedIn, login, logout } = useAuth();
    const [errorMessage, setErrorMessage] = useState();
    const nav = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient.get('sanctum/csrf-cookie')
            .then(response => {
                apiClient.post('api/login', {
                    email: email,
                    password: password
                }).then(response => {
                    if(response.status === 201) {
                        login();
                        localStorage.setItem("profile", JSON.stringify(response.data.user.name));
                        localStorage.setItem("email", JSON.stringify(response.data.user.email));
                        localStorage.setItem("token", ("Bearer " + response.data.token));
                        localStorage.setItem("admin", JSON.stringify(response.data.user.admin_privilege));
                        nav("/");
                    }
                }).catch((error) => {
                    setErrorMessage('Invalid username or password');
                })
            });
    }

    return (
        <div>
            {isLoggedIn ? (
                <div></div>
            ) : (
                <div>
                    <Navbar/>
                    <h1 className='title'>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-container'>
                            {errorMessage && <div>{errorMessage}</div>}
                            <input
                                className='form-input'
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <input
                                className='form-input'
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button className='buy-button press' type="submit">Login</button>
                        </div>
                    </form>
                </div>
            )}
            <Footer/>
        </div>
    );
}
 
export default Login;