import CartBlock from "../Cart/CartBlock";
import PageError from "../Alert/PageError";
import Subtotal from "../Cart/Subtotal";
import AxiosApi from "../../Api/AxiosApi";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import { setCartNumber } from "../../Redux/Reducer/AuthKey";

function AddtoCart(props) {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);
  const comp=createRef()

  // useEffect(() => {
  //   comp.current.scrollTo(0, 0);
  // }, [comp]);

  const cartLoader = useCallback(() => {
    setLoad(true);
    AxiosApi.get("cartpage")
      .then((res) => {
        setLoad(false);
        setList(res.data);
      })
      .catch((err) => {
        setError(err);
        setLoad(false);
      });
  }, []);

  useEffect(() => {
    cartLoader();
  }, [cartLoader]);

  const removeFromCart = useCallback(
    (id) => {
      AxiosApi.delete("cart/" + id).then(() => {
        dispatch(notifyUser("Product removed from Cart"));
        setList((list) => list.filter((val) => val.id !== id && val.id));
        AxiosApi.get("cartcount").then((res) => {
          dispatch(setCartNumber(res.data.length));
        });
      });
    },
    [dispatch]
  );
  return (
    <div ref={comp} className="wish-list">
      <h1>
        Shopping Cart <FontAwesomeIcon icon={faShoppingCart} />
      </h1>
      <hr />
      {list.length > 0 ? (
        list.map((val) => (
          <CartBlock
            key={val.id}
            price={val.price}
            quantity={val.quantity}
            id={val.id}
            cart_id={val.cart_id}
            title={val.title}
            removeFromCart={removeFromCart}
            maxQty={Number(val.maxQty)}
          />
        ))
      ) : (
        <div>
          <h4>Your Cart is empty </h4>
        </div>
      )}
      {list.length > 0 && <Subtotal reload={cartLoader} data={list} />}

      {error && <PageError error={error.message} loadData={cartLoader} />}
      {load && <FullScreenLoader />}
    </div>
  );
}

export default AddtoCart;
