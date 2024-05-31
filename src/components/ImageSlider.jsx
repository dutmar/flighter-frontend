import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images, interval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const changeImage = () => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        const intervalId = setInterval(changeImage, interval);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [images.length, interval]);

    return (
        <div>
            <img 
                src={images[currentIndex]} 
                alt={`Slide ${currentIndex}`} 
                style={{ width: '70vw', height: '40vh', borderRadius: '40px' }} 
            />
        </div>
    );
};

export default ImageSlider;
