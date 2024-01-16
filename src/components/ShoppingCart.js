import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';

const ShoppingCart = () => {
  const { isLoggedIn, login, logout } = useAuth();

  return (
    <div>
      <Navbar/>
      {isLoggedIn ? (
         <h2>Shopping Cart</h2>
      ) : (
        <h1>LOG IN</h1>
      )}
    </div>
  );
};

export default ShoppingCart;