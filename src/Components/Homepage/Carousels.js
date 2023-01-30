import React from "react";
import { Carousel } from "react-responsive-carousel";
import "../../CSS/Carousel.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

function Carousels(props) {
  const navigate = useNavigate();
  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div
        className="carosel-container"
        onClick={() => {
          navigate("/view/2");
        }}
      >
        <img src="/assets/images/carosel1.jpg" alt="carosel" />
      </div>
      <div
        className="carosel-container"
        onClick={() => {
          navigate("/view/20");
        }}
      >
        <img src="/assets/images/carosel2.jpg" alt="carosel" />
      </div>
      <div
        className="carosel-container"
        onClick={() => {
          navigate("/view/19");
        }}
      >
        <img src="/assets/images/carosel3.jpg" alt="carosel" />
      </div>
    </Carousel>
  );
}

export default Carousels;
