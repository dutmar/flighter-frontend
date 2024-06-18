import React, { useEffect } from "react";
import apiClient from "../services/api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51P6x9BICSrlzlIyR8GN51tcx9WbXsJIIW2oc0NizdAiQ29vQv0oviHCCoez09dk76LroIpEzxxVyM4kb2y8Pyx6Y00Ms6m5ivy');

const Checkout = (props) => {
    const [clientSecret, setClientSecret] = React.useState();

    useEffect(() => {
        const fetchData = (async () => {
            const response = await apiClient.post('/api/stripe', {
                amount: props.amount,
            });
            setClientSecret(response.data);
        });

        fetchData();
    }, []);
      
    const options = {
        clientSecret: clientSecret,
    };

    return (
        <div>
            {clientSecret ? (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm cart={props.cart} />
                </Elements>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default Checkout;