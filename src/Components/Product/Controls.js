import React, { useEffect, useState } from "react";
import PriceFormat from "../StringFormat/PriceFormat";
import AxiosApi from "../../Api/AxiosApi";
import AddressGetter from "../Popup/AddressGetter";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../Redux/Reducer/LoginBtn";
import { setCartNumber } from "../../Redux/Reducer/AuthKey";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  notifyUser,
  notifyUserError,
} from "../../Redux/Reducer/SendNotification";
import {
  faAdd,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function Controls({ getQuantity, id, price }) {
  let [quantity, setQuantity] = useState(1);
  let [wishlist, setWishlist] = useState(false);
  let [cart, setCart] = useState(false);
  let [order, setOrder] = useState(false);
  const isLogin = useSelector((state) => state.Authentication.isLogin);
  const isAdmin = useSelector((state) => state.Authentication.isAdmin);
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
            notifyUserError(err.response ? "Login required" : err.message)
          );
          err.response && dispatch(setLogin(true));
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
    } else {
      setWishlist(false);
      setCart(false);
    }
  }, [id, isLogin, dispatch]);

  function Add2Cart() {
    if (cart) {
      AxiosApi.delete("cart/" + id).then(() => {
        setCart(false);
        dispatch(notifyUser("Product removed from cart"));
        AxiosApi.get("cartcount").then((res) => {
          dispatch(setCartNumber(res.data.length));
        });
      });
    } else {
      AxiosApi.post("addtocart", { p_id: id, quantity: quantity })
        .then(() => {
          setCart(true);
          dispatch(notifyUser("Product added to cart"));
          AxiosApi.get("cartcount").then((res) => {
            dispatch(setCartNumber(res.data.length));
          });
        })
        .catch((err) => {
          dispatch(
            notifyUserError(err.response ? "Login required" : err.message)
          );
          err.response && dispatch(setLogin(true));
        });
    }
  }

  return (
    <div className="product-controls">
      <div className="quantity">
        {Number(getQuantity) > 1 && (
          <>
            <span className="quantity-text">Quantity</span>
            <div>
              {!isAdmin ? (
                <>
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
                      quantity < Number(getQuantity) &&
                        setQuantity(quantity + 1);
                    }}
                    disabled={quantity === Number(getQuantity) ? true : false}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </>
              ) : (
                <span>{getQuantity}</span>
              )}
            </div>
          </>
        )}
        <h3>
          <PriceFormat price={Number(price) * quantity} />
        </h3>
      </div>
      <div className="controls">
        {Number(getQuantity) <= 5 && Number(getQuantity) > 0 && (
          <span className="product-alert">
            Only {getQuantity} stocks available{" "}
          </span>
        )}

        {Number(getQuantity) > 0 ? (
          !isAdmin && (
            <>
              <button onClick={Add2Cart}>
                {cart ? "Remove from cart" : "Add to Cart"}{" "}
                <FontAwesomeIcon icon={faAdd} />
              </button>
              <button
                onClick={() =>
                  isLogin ? setOrder(true) : dispatch(setLogin(true))
                }
              >
                Buy Now <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </>
          )
        ) : (
          <span className="product-alert">Out of stock</span>
        )}
        {!isAdmin && (
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
        )}
      </div>
      {order && (
        <AddressGetter cancel={setOrder} p_id={id} quantity={quantity} />
      )}
    </div>
  );
}

export default Controls;
