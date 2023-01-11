import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../CSS/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Carousels(props) {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div className="carosal-container">
        <img src="/assets/images/carosal1.jpg" alt="carosal" />
      </div>
      <div className="carosal-container">
        <img src="/assets/images/carosal2.jpg" alt="carosal" />
      </div>
      <div className="carosal-container">
        <img src="/assets/images/carosal3.jpg" alt="carosal" />
      </div>
    </Carousel>
  );
}

export default Carousels;
