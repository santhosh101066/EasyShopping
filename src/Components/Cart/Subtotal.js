import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Subtotal(props) {
  return (
    <div>
      <div className="subtotal">
        <div className="info">
          <span>Subtotal (7 items) : price</span>
          <button>Buy Now <FontAwesomeIcon icon={faShoppingBag}/></button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Subtotal;
