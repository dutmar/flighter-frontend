import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Checkout = (amount) => {

    return (
        <div>
            <Navbar/>
            <div>{amount}</div>
            <Footer/>
        </div>
    )
}

export default Checkout;