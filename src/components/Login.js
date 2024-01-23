import React from 'react';
import apiClient from '../services/api';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
 
const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    //const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const { isLoggedIn, login, logout } = useAuth();
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
                        nav("/");
                    }
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
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                </div>
            )}
            <Footer/>
        </div>
    );
}
 
export default Login;