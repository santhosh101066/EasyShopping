import React from "react";
import CartBlock from "../Cart/CartBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Subtotal from "../Cart/Subtotal";

function AddtoCart(props) {
  return (
    <div className="wish-list">
      <h1>
        Shopping Cart <FontAwesomeIcon color="#fff178" icon={faShoppingCart} />
      </h1>
      <hr/>
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <Subtotal/>
    </div>
  );
}

export default AddtoCart;
