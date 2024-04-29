import React, {useState} from 'react';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import '../styles/checkout.css';
import apiClient from '../services/api';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = (props) => {
  const stripe = useStripe();
  const elements = useElements();
  const nav = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const {error} = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/',
      },
      redirect: "if_required",
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      //console.log(props.cart);
      handleBuy();
      nav('/');
    }
  };

  const handleBuy = () => {
    //setShowSuccessMessage(true);
    props.cart.forEach(flight => {
      apiClient.get('api/flights/'+flight.id)
      .then(response => {
        apiClient.put('/api/flights/'+flight.id, null,  {
          params: {
            noOfSeats: response.data.noOfSeats-1
          }
        })
        .then(response => {
          apiClient.post('api/tickets', {
            email: JSON.parse(localStorage.getItem('email')),
            origin: flight.origin,
            destination: flight.destination
          })
          .then(response => {
            localStorage.removeItem('cart');
          })
        })
        .catch(error => console.error(error));
      })
    });
  }

  return (
    <form className='card-form' onSubmit={handleSubmit}>
      <PaymentElement />
      <button className='buy-button' disabled={!stripe}>Submit</button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  )
};

export default CheckoutForm;
