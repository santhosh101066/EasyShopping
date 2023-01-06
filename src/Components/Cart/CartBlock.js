import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CartBlock(props) {
  return (
    <div className="cart-block">
      <div className="cart-info">
        <img src="/assets/images/m1.jpg" alt="Product" />
        <span className="title">
          OnePlus Nord CE 2 Lite 5G (Blue Tide, 6GB RAM, 128GB Storage)OnePlus
          Nord CE 2 Lite 5G (Blue Tide, 6GB RAM, 128GB Storage)
        </span>
      </div>
      <div className="cart-control">
        <span>Quantity 1</span>
        <span>Price</span>
        <span>
          <button>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </span>
      </div>
    </div>
  );
}

export default CartBlock;
