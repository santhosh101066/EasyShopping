import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../CSS/DetailedView.css";


function DetailedProduct(props) {
  return (
    <div className="detailed-product">
      <div className="thumb-images">
        <div className="thumbs">
          {/* thumb img */}
          <div>
            <img src="/assets/images/m1.jpg" alt="" />
          </div>
          <div>
            <img src="/assets/images/m2.jpg" alt="" />
          </div>
          <div>
            <img src="/assets/images/p1.jpg" alt="" />
          </div>
          <div>
            <img src="/assets/images/p2.jpg" alt="" />
          </div>
          <div>
            <img src="/assets/images/m1.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="product-image">
        {/* Product img */}
        <img src="/assets/images/m1.jpg" alt="" />
      </div>
      <div className="product-details">
        <h2>
          Redmi 9A Sport (Coral Green, 2GB RAM, 32GB Storage) | 2GHz Octa-core
          Helio G25 Processor | 5000 mAh Battery
        </h2>
        <h3>₹6,499</h3>
        <h4>More details</h4>
        <ul>
            <li>Processor: MediaTek Helio G25 Octa-core; Up to 2.0GHz clock speed</li>
            <li>Camera: 13 MP Rear camera with AI portrait| 5 MP front camera</li>
            <li>Display: 16.58 centimeters (6.53-inch) HD+ display with 720x1600 pixels and 20:9 aspect ratio</li>
            <li>Battery: 5000 mAH large battery with 10W wired charger in-box</li>
            <li>Memory, Storage & SIM: 2GB RAM | 32GB storage | Dual SIM (nano+nano) + Dedicated SD card slot</li>
            <li>The Selfie camera allows easy and convenient access to your phone with AI face unlock</li>
            <li>Form factor:Bar,Operating system:MIUI 12</li>
        </ul>
      </div>
      <div className="product-controls">
        
            <button>Add to Cart <FontAwesomeIcon icon={faAdd}/></button>
            <button>Buy Now <FontAwesomeIcon icon={faCartShopping}/></button>
            <button>Add to Wish List <FontAwesomeIcon icon={faHeart}/></button>
        
      </div>
    </div>
  );
}

export default DetailedProduct;
