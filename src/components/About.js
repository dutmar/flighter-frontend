import React from "react";
import Navbar from "./Navbar";
import Footer from './Footer';
import '../styles/about.css';

const About = () => {

    return (
        <div>
            <Navbar />
            <div className="about-body">
                <h1>About Us</h1>
                <div className="box">
                    Welcome to our awesome site for flight searching! This page provides information about 
                    our team and our motivation for user friendly site for unexperienced buyers!
                </div>
                <h2>Our Mission</h2>
                <div className="box">
                    Our mission is to create an amazing user experience that can help even the first time buyers of plane tickets.
                    It's that simple!
                </div>
                <h2>Meet the Team</h2>
                <div className="box">
                    <li>Darjan Utmar - Frontend Developer</li>
                    <li>Darjan Utmar - Backend Developer</li>
                    <li>Darjan Utmar - UI/UX Designer</li>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default About;