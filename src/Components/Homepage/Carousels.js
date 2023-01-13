import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../CSS/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Carousels(props) {
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div className="carosel-container">
        <img src="/assets/images/carosel1.jpg" alt="carosel" />
      </div>
      <div className="carosel-container">
        <img src="/assets/images/carosel2.jpg" alt="carosel" />
      </div>
      <div className="carosel-container">
        <img src="/assets/images/carosel3.jpg" alt="carosel" />
      </div>
    </Carousel>
  );
}

export default Carousels;
