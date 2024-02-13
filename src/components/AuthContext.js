import { createContext, useContext, useState } from 'react';
import apiClient from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = JSON.parse(localStorage.getItem('token'));

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    apiClient.post('api/logout', {
      'Authorization': 'Bearer ' + token
    }).then(response => {
      console.log(response);
    })
    .catch(error => console.error(error))

    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};