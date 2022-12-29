import React from "react";
import "./Carousel.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Carousels(props) {
  return (
    <Carousel showThumbs={false} autoPlay>
      <div className="carosal-container">
        <img src="carosal1.jpeg" alt="carosal" />
      </div>
      <div className="carosal-container">
        <img src="carosal1.jpeg" alt="carosal" />
      </div>
      <div className="carosal-container">
        <img src="carosal1.jpeg" alt="carosal" />
      </div>
    </Carousel>
  );
}

export default Carousels;
