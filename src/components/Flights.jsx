import React from 'react';
import axios from 'axios';
import apiClient from '../services/api';
import Navbar from './Navbar';
import { useAuth } from './AuthContext';
import ShoppingCart from './ShoppingCart';
import '../styles/flights.css';
import Footer from './Footer';
import ImageSlider from './ImageSlider';
 
const Flights = () => {
    const [flights, setFlights] = React.useState([]);
    // const { isLoggedIn, login, logout } = useAuth();
    const uniqueValues = new Set();

    const planeImages = [
        'https://www.savethestudent.org/uploads/flights.jpg',
        'https://bsmedia.business-standard.com/_media/bs/img/article/2021-02/22/full/1613992796-763.jpg?im=FeatureCrop,size=(803,452)',
        'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/cd/52/50/tap-portugal.jpg?w=1200&h=-1&s=1',
        'https://ba.scene7.com/is/image/ba/airbus-a380-inflight-high-altitude:4-3?ts=1715962007387&dpr=off'
      ]

    React.useEffect(() => {
        apiClient.get('api/flights')
        .then(response => {
            setFlights(response.data)
        })
        .catch(error => console.error(error));
    }, []);

    const values = flights.map((flight) => {
        if(!uniqueValues.has(flight.airline)) {
            uniqueValues.add(flight.airline);
        }
    })

    const airlines  = [...uniqueValues];

    const flightsList = airlines.map((airline) =>
        <div className='flight-in-list'>
            <li>{airline}</li>
        </div>
    );

    return (
        <div>
            <Navbar />
            <Footer/>
            <div className='flight-list'>{flightsList}</div>
            <div className='image-slider'>
                <ImageSlider images={planeImages} interval={4000}/>
            </div>
        </div>
    );
    
}
 
export default Flights;