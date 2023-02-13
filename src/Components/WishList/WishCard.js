import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import PriceFormat from "../StringFormat/PriceFormat";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../../Api/AxiosApi";

function WishCard({ title, price, id, removeFromlist }) {
  const navigate = useNavigate();

  return (
    <div
      className="cart-block"
      onClick={() => {
        navigate("/view/" + id);
      }}
    >
      <div className="cart-info">
        <img src={`${SERVER}/assets/images/${id}.png`} alt="Product" />
        <span className="title">{title}</span>
      </div>
      <div className="cart-control">
        <span>
          Price : <PriceFormat price={price} />
        </span>
        <span>
          <button className="delete" data-testid="delete-button"
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
