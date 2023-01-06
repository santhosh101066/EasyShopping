import React from "react";
import CartBlock from "../Cart/CartBlock";
import "../../CSS/Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Wishlist(props) {
  return (
    <div className="wish-list">
      <h1>
        Your Wish List  <FontAwesomeIcon color="#ff007b" icon={faHeart} />
      </h1>
      <hr />
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <CartBlock />
      <CartBlock />
    </div>
  );
}

export default Wishlist;
