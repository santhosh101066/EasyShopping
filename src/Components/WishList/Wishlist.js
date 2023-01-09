import React, { useEffect } from "react";
import CartBlock from "../Cart/CartBlock";
import "../../CSS/Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Wishlist(props) {
  useEffect(()=>{
    window.scrollTo(0,0)
},[])
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
