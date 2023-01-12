import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PriceFormat from "../StringFormat/PriceFormat";
import { useNavigate } from "react-router-dom";

function CartBlock({ title, price, quantity = 1, id, removeFromCart }) {
  const db = process.env.REACT_APP_DB;
  const navigate = useNavigate();
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
        <span>Quantity {quantity}</span>
        <span>
          Price : <PriceFormat price={Number(price) * quantity} />
        </span>
        <span>
          <button
            onClick={(e) => {
              removeFromCart(id);
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

export default CartBlock;
