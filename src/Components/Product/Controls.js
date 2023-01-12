import {
  faAdd,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import PriceFormat from "../StringFormat/PriceFormat";
import AxiosApi from "../../Api/AxiosApi";
import { useDispatch, useSelector } from "react-redux";
import {
  notifyUser,
  notifyUserError,
} from "../../Redux/Reducer/SendNotification";

function Controls({ getQuantity, id, price }) {
  let [quantity, setQuantity] = useState(1);
  let [wishlist, setWishlist] = useState(false);
  let [cart, setCart] = useState(false);
  const isLogin = useSelector((state) => state.Authentication.isLogin);
  const dispatch = useDispatch();
  function addToWishlist() {
    if (wishlist) {
      AxiosApi.delete("wishlist/" + id).then(() => {
        setWishlist(false);
        dispatch(notifyUser("Product removed from wishlist"));
      });
    } else {
      AxiosApi.post("wishlist", { p_id: id })
        .then(() => {
          setWishlist(true);
          dispatch(notifyUser("Product added to wishlist"));
        })
        .catch((err) => {
          dispatch(
            notifyUserError(
              err.response ? err.response.statusText : err.message
            )
          );
        });
    }
  }

  useEffect(() => {
    if (isLogin) {
      AxiosApi.get("wishlist/" + id)
        .then((res) => {
          res.data.length > 0 && setWishlist(true);
        })
        .catch((err) => {
          dispatch(
            notifyUserError(
              err.response ? err.response.statusText : err.message
            )
          );
        });

      AxiosApi.get("cart/" + id)
        .then((res) => {
          res.data.length > 0 && setCart(true);
        })
        .catch((err) => {
          dispatch(
            notifyUserError(
              err.response ? err.response.statusText : err.message
            )
          );
        });
    }
  }, [id, isLogin, dispatch]);

  function Add2Cart() {
    if (cart) {
      AxiosApi.delete("cart/" + id).then(() => {
        setCart(false);
        dispatch(notifyUser("Product removed from cart"));
      });
    } else {
      AxiosApi.post("addtocart", { p_id: id, quantity: quantity }).then(() => {
        setCart(true);
        dispatch(notifyUser("Product added to cart"));
      });
    }
  }

  return (
    <div className="product-controls">
      <div className="quantity">
        <span className="quantity-text">Quantity</span>
        <div>
          <button
            onClick={() => {
              quantity > 1 && setQuantity(quantity - 1);
            }}
            disabled={quantity === 1 ? true : false}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => {
              quantity < Number(getQuantity) && setQuantity(quantity + 1);
            }}
            disabled={quantity === Number(getQuantity) ? true : false}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <h3>
          <PriceFormat price={Number(price) * quantity} />
        </h3>
      </div>
      <div className="controls">
        <button onClick={Add2Cart}>
          {cart ? "Remove from cart" : "Add to Cart"}{" "}
          <FontAwesomeIcon icon={faAdd} />
        </button>
        <button>
          Buy Now <FontAwesomeIcon icon={faCartShopping} />
        </button>
        <button onClick={addToWishlist}>
          {wishlist ? (
            <>
              Remove from Wish List <FontAwesomeIcon icon={faHeart} />
            </>
          ) : (
            <>
              Add to Wish List <FontAwesomeIcon icon={faHeart} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default Controls;
