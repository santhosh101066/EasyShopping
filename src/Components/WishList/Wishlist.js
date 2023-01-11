import React, { useEffect } from "react";
import "../../CSS/Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import WishCard from "./WishCard";

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
      <WishCard/>
      <WishCard/>
      <WishCard/>
      <WishCard/>
      <WishCard/>
      <WishCard/>
    </div>
  );
}

export default Wishlist;
