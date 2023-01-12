import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PriceFormat from "../StringFormat/PriceFormat";
import { useNavigate } from "react-router-dom";


function WishCard({ title, price, id ,removeFromlist}) {
  const navigate = useNavigate();
  const db = process.env.REACT_APP_DB;

  return (
    <div
      className="cart-block"
      onClick={() => {
        navigate("/view/" + id);
      }}
    >
      <div className="cart-info">
        <img src={`${db}/assets/images/${id}.png`} alt="Product" />
        <span className="title">{title}</span>
      </div>
      <div className="cart-control">
        <span>
          Price : <PriceFormat price={price} />
        </span>
        <span>
          <button
            onClick={(e) => {
              removeFromlist(id);
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </span>
      </div>
    </div>
  );
}

export default WishCard;
