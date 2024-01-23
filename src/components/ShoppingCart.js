import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const ShoppingCart = ({ object }) => {
  const { isLoggedIn, login, logout } = useAuth();
  const cart = JSON.parse(localStorage.getItem('cart'));
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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
    setShowSuccessMessage(true);
    cart.forEach(flight => {
      apiClient.get('api/flights/'+flight.id)
      .then(response => {
        apiClient.put('/api/flights/'+flight.id, null,  {
          params: {
            noOfSeats: response.data.noOfSeats-1
          }
        })
        .then(response => {
          setTimeout(() => {
            nav('/');
          }, 3000);
        })
        .catch(error => console.error(error));
      })
    });
  }

  return (
    <div>
      {showSuccessMessage ? (
        <div>Successfully purchased! Redirecting...</div>
      ) : (
        <div>
          <Navbar/>
          <h2>Shopping Cart</h2>

          {cartList.length > 0 ? (
            <ul>{cartList}</ul>
          ) : (
            <div></div>
          )}

          <div>To pay: {toPay.toFixed(2)}$</div>
          <button onClick={handleBuy}>Buy now</button>
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default ShoppingCart;