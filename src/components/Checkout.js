import React, { useEffect } from "react";
import apiClient from "../services/api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51P6x9BICSrlzlIyR8GN51tcx9WbXsJIIW2oc0NizdAiQ29vQv0oviHCCoez09dk76LroIpEzxxVyM4kb2y8Pyx6Y00Ms6m5ivy');

const Checkout = (props) => {
    const [clientSecret, setClientSecret] = React.useState('');

    useEffect(() => {
        const fetchData = (async () => {
            const response = await apiClient.post('/api/stripe', {
                amount: props.amount*100,
            });
            //const {client_secret: clientSecret} = await response.json();
            // Render the form using the clientSecret
            console.log(response.data);
            setClientSecret(response.data.client_secret);
        })();
    }, []);
      
    const options = {
        clientSecret: clientSecret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
        </Elements>
    );
}

export default Checkout;