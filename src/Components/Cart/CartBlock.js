import React, { useCallback, useState } from "react";
import PriceFormat from "../StringFormat/PriceFormat";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import AxiosApi, { SERVER } from "../../Api/AxiosApi";

function CartBlock({
  title,
  price,
  quantity = 1,
  id,
  removeFromCart,
  maxQty,
  cart_id,
}) {

  const navigate = useNavigate();
  const [qty, setQty] = useState(quantity);

  const changeQuantity = useCallback(
    (qty) => {
      AxiosApi.put("addtocart/" + cart_id, {
        id: cart_id,
        p_id: id,
        quantity: qty,
      }).then(() => {
      
      });
    },
    [cart_id, id]
  );
  const handleIncrement = useCallback(
    (e) => {
      e.stopPropagation();
      setQty((val) => {
        val = val + 1;
        changeQuantity(val);
        return val;
      });
    },
    [changeQuantity]
  );
  const handleDecrement = useCallback(
    (e) => {
      e.stopPropagation();
      setQty((val) => {
        val = val - 1;
        changeQuantity(val);
        return val;
      });
    },
    [changeQuantity]
  );
  const handleView = useCallback(() => {
    navigate("/view/" + id);
  }, [id, navigate]);

  return (
    <div className="cart-block">
      <div className="cart-info">
        <img
          onClick={handleView}
          src={`${SERVER}/assets/images/${id}.png`}
          alt="Product"
        />
        <span onClick={handleView} className="title">
          {title}
        </span>
      </div>
      <div className="cart-control">
        <div className="cart-quantity">
          <span>Quantity</span>
          <div>
            <button disabled={qty <= 1} onClick={handleDecrement}>
              <b>-</b>
            </button>
            <span>{qty}</span>
            <button disabled={qty >= maxQty} onClick={handleIncrement}>
              <b>+</b>
            </button>
          </div>
        </div>
        <span className="cart-price">
          Price : <PriceFormat price={Number(price) * qty} />
        </span>
        <span>
          <button
          data-testid="cart-delete"
            className="delete"
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
