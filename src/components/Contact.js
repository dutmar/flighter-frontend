import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import '../styles/contact.css'

const Contact = () => {

    return (
        <div>
            <Navbar />
            <div className="contact-body">
                <h1>Contact Us</h1>
                <div className="box">
                    If you have any questions or feedback, feel free to reach out to us at{' '}
                    <a href="mailto:info@example.com">flighter@experience.com</a>.
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Contact;