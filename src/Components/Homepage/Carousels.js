import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../CSS/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Carousels(props) {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div className="carosal-container">
        <img src="/assets/images/carosal1.jpeg" alt="carosal" />
      </div>
      <div className="carosal-container">
        <img src="/assets/images/carosal2.webp" alt="carosal" />
      </div>
      <div className="carosal-container">
        <img src="/assets/images/carosal3.jpeg" alt="carosal" />
      </div>
    </Carousel>
  );
}

export default Carousels;
