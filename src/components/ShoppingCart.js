import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = ({ object }) => {
  const { isLoggedIn, login, logout } = useAuth();
  const cart = JSON.parse(localStorage.getItem('cart'));
  const nav = useNavigate();

  let toPay = 0;

  cart.forEach(flight => {
    toPay += parseFloat(flight.price);
  });

  if(cart) {
    var cartList = cart.map((flight) =>
    <div>
      <li key={flight.id}>
        <div>
        {flight.origin}-{flight.destination}
        </div>
        <div>{flight.price}$</div>
      </li>
    </div>
    );
  }

  const handleBuy = () => {
    cart.forEach(flight => {
      apiClient.get('api/flights/'+flight.id)
      .then(response => {
        if(response.data.noOfSeats > 0) {
          apiClient.put('/api/flights/'+flight.id, null,  {
            params: {
              noOfSeats: response.data.noOfSeats-1
            }
          })
          .then(response => {
            console.log(response.data);
            console.log("updateano");
            nav('/');
          })
          .catch(error => console.error(error));
        }
      })
    });
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

      <div>To pay: {toPay}$</div>
      <button onClick={handleBuy}>Buy now</button>
    </div>
  );
};

export default ShoppingCart;