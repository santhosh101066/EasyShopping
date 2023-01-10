import React, { useCallback, useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../CSS/DetailedView.css";
import AxiosApi from "../../Api/AxiosApi";


function DetailedProduct(props) {
  let [image, setImage] = useState("/assets/images/m1.jpg");
  const handleClickImage = useCallback((e) => {
    setImage(e.target.src);
  }, []);
  //const context=useContext()

  useEffect(()=>{
    // console.log(context);
    // AxiosApi.get('product/detailed/'+context.id)
  })

  return (
    <div className="detailed-product">
      <div className="thumb-images">
        <div className="thumbs" onClick={handleClickImage}>
          {/* thumb img */}

          <img src="/assets/images/m1.jpg" alt="" />

          <img src="/assets/images/m2.jpg" alt="" />

          <img src="/assets/images/p1.jpg" alt="" />

          <img src="/assets/images/p2.jpg" alt="" />

          <img src="/assets/images/m1.jpg" alt="" />
        </div>
      </div>

      <div className="product-image">
        {/* Product img */}
        <img src={image} alt="" />
      </div>
      <div className="product-details">
        <h2>
          Redmi 9A Sport (Coral Green, 2GB RAM, 32GB Storage) | 2GHz Octa-core
          Helio G25 Processor | 5000 mAh Battery
        </h2>
        <h4>More details</h4>
        <ul>
          <li>
            Processor: MediaTek Helio G25 Octa-core; Up to 2.0GHz clock speed
          </li>
          <li>Camera: 13 MP Rear camera with AI portrait| 5 MP front camera</li>
          <li>
            Display: 16.58 centimeters (6.53-inch) HD+ display with 720x1600
            pixels and 20:9 aspect ratio
          </li>
          <li>Battery: 5000 mAH large battery with 10W wired charger in-box</li>
          <li>
            Memory, Storage & SIM: 2GB RAM | 32GB storage | Dual SIM (nano+nano)
            + Dedicated SD card slot
          </li>
          <li>
            The Selfie camera allows easy and convenient access to your phone
            with AI face unlock
          </li>
          <li>Form factor:Bar,Operating system:MIUI 12</li>
        </ul>
      </div>
      <div className="product-controls">
        <div className="quantity">
          <span className="quantity-text">Quantity</span>
          <div>
            <button>
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span>1</span>
            <button>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <h3>₹6,499</h3>
        </div>
        <div className="controls">
          <button>
            Add to Cart <FontAwesomeIcon icon={faAdd} />
          </button>
          <button>
            Buy Now <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <button>
            Add to Wish List <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailedProduct;
