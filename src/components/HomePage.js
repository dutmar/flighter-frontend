import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Footer from "./Footer";
import '../styles/homePage.css'
import planeBody from '../img/planeBody.jpg'

const HomePage = () => {

    return (
        <div>
            <Navbar/>
            <Search/>
            <Footer/>
        </div>
    );
}

export default HomePage;