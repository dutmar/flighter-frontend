import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';

const ShoppingCart = () => {
  const { isLoggedIn, login, logout } = useAuth();
  const [cart, setCart] = React.useState(JSON.parse(localStorage.getItem("cart")));

  console.log(cart);
  
  return (
    <div>
      <Navbar/>
      <h2>Shopping Cart</h2>
    </div>
  );
};

export default ShoppingCart;