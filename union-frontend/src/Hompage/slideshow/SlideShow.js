import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import "./slideshow.css"

function Slideshow(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    const index = (currentIndex - 1 + props.images.length) % props.images.length;
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const index = (currentIndex + 1) % props.images.length;
    setCurrentIndex(index);
  };

  return (
    <div className="slideshow">
    <button className="previous-slide" onClick={previousSlide}>
        <FaArrowLeft />
      </button>
      <button className="next-slide" onClick={nextSlide}>
        <FaArrowRight />
      </button>
      <img src={props.images[currentIndex]} alt={`Slide ${currentIndex}`} className="slide-image" />
      <div className="slideshow-buttons">
  {props.images.map((_, index) => (
    <label key={index} className={index === currentIndex ? 'active' : ''}>
      <input type="radio" name="slide" value={index} checked={index === currentIndex} onChange={() => setCurrentIndex(index)} />
      <span className="slider-dot"></span>
    </label>
  ))}
</div>

      
    </div>
  );
}



export default Slideshow;