import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
const ShoppingCart = ({ object }) => {
  const { isLoggedIn, login, logout } = useAuth();
  const cart = JSON.parse(localStorage.getItem('cart'));
  let toPay = 0.00;

  if(cart) {
    var cartList = cart.map((flight) => 
    <li key={flight.id}>
      <div>
      {flight.origin}-{flight.destination}
      </div>
      <div>{flight.price}$</div>
    </li>
    );
  }

  return (
    <div>
      <Navbar/>
      <h2>Shopping Cart</h2>

      {cartList.length > 0 ? (
        <ul>{cartList}</ul>
      ) : (
        <div></div>
      )}

      <div>To pay: {toPay}</div>
    </div>
  );
};

export default ShoppingCart;