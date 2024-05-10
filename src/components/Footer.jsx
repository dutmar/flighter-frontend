import React from "react";
import { NavLink } from "react-router-dom";
import '../styles/footer.css'

const Footer = () => {

    return (
        <footer className="footer">
            <NavLink to='/' className="navlink">
                <h4>© 2024 Flighter Team, flights search site</h4>
            </NavLink>
        </footer>
    );
}

export default Footer;