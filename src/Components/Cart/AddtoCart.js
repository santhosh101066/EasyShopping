import React, { useCallback, useEffect, useState } from "react";
import CartBlock from "../Cart/CartBlock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Subtotal from "../Cart/Subtotal";
import AxiosApi from "../../Api/AxiosApi";
import { useDispatch } from "react-redux";
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import PageError from "../Alert.js/PageError";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";

function AddtoCart(props) {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
      });
    },
    [dispatch]
  );
  return (
    <div className="wish-list">
      <h1>
        Shopping Cart <FontAwesomeIcon icon={faShoppingCart} />
      </h1>
      <hr />
      {list.length>0?list.map((val) => (
        <CartBlock
          key={val.id}
          price={val.price}
          quantity={val.quantity}
          id={val.id}
          title={val.title}
          removeFromCart={removeFromCart}
        />
      )):<div><h4>Your Cart is empty </h4></div>}
      {list.length > 0 && <Subtotal reload={cartLoader} data={list} />}

      {error && <PageError error={error} loadData={cartLoader} />}
      {load && <FullScreenLoader />}
    </div>
  );
}

export default AddtoCart;
