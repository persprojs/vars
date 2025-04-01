import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import BannerImg1 from '../assets/Banner-img1.png'; // Import images
import BannerImg2 from '../assets/Banner-img2.png';
import '../assets/Banner.css'; // Import your custom styles

const Banner = () => {
  const [index, setIndex] = useState(0); // State to track the current slide index

  // Handle slide change
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Save the current index to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('carouselIndex', index);
  }, [index]);

  // Restore the index from localStorage when the component mounts
  useEffect(() => {
    const savedIndex = localStorage.getItem('carouselIndex');
    if (savedIndex !== null) {
      setIndex(parseInt(savedIndex, 10));
    }
  }, []);

  // Force re-render when the app regains focus
  useEffect(() => {
    const handleFocus = () => {
      setIndex((prevIndex) => prevIndex); // Force re-render
    };

    window.addEventListener('focus', handleFocus);
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      interval={2000} // Set the interval to 2000 milliseconds (2 seconds)
      key={index} // Force re-render when index changes
    >
      <Carousel.Item>
        <div className="banner-container">
          <img
            className="d-block banner-img"
            src={BannerImg1} // Use imported image
            alt="Homeopathy Store - Dr Reckeweg, SBL, Adel, Schwabe, Wheezal, Bakson, Allen, Bjain, Haslab, Lords, Medisynth, Dr. Willmar Schwabe"
            loading="lazy" // Lazy load the image
          />
        </div>
        <Carousel.Caption>
          <h3></h3>
          <p>We believe in Creating Happy Customers</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <div className="banner-container">
          <img
            className="d-block banner-img"
            src={BannerImg2} // Use imported image
            alt="Ayurveda Store - Dabur, Baidyanath, Zandu, Himalaya, Patanjali, Hamdard, Charak, Dr. Vaidya's, Kottakkal, Kerala Ayurveda, Aimil, Jiva, Maharishi Ayurveda"
            loading="lazy" // Lazy load the image
          />
        </div>
        <Carousel.Caption>
          <h3></h3>
          <p></p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Banner;