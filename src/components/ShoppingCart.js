import React, { useState } from 'react';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import '../styles/shoppingCart.css'

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
      <div className='flight-in-list' key={flight.id}>
        <div>
        {flight.origin}-{flight.destination}
        </div>
        <div>{flight.price}$</div>
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
          <h1 className='title'>Shopping Cart</h1>

          {cartList.length > 0 ? (
            <div className='shopping-cart-container'>
              <div className='flight-list'>{cartList}</div>
              <div className='sum'>TOTAL: {toPay.toFixed(2)}$</div>
              <button onClick={handleBuy}>Buy now</button>
            </div>
          ) : (
            <div>Empty cart</div>
          )}
        </div>
      )}

      <Footer/>
    </div>
  );
};

export default ShoppingCart;