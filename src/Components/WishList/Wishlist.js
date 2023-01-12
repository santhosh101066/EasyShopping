import React, { useCallback, useEffect, useState } from "react";
import "../../CSS/Cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import WishCard from "./WishCard";
import AxiosApi from "../../Api/AxiosApi";
import { useDispatch } from "react-redux";
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import PageError from "../Alert.js/PageError";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";

function Wishlist(props) {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [load,setLoad]=useState(false)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wishlistLoader= useCallback(()=>{
    setLoad(true)
    AxiosApi.get("wishlistpage")
      .then((res) => {
        setList(res.data);
        setLoad(false)
      })
      .catch((err) => {
        setError(err);
        setLoad(false)
      });
  },[])

  useEffect(() => {
   wishlistLoader()
  }, [wishlistLoader]);

  const removeFromlist = useCallback(
    (id) => {
      AxiosApi.delete("wishlist/" + id).then(() => {
        dispatch(notifyUser("Product removed from wishlist"));
        setList((list) => list.filter((val) => val.id !== id && val.id));
      });
    },
    [dispatch]
  );

  return (
    <div className="wish-list">
      <h1>
        Your Wish List <FontAwesomeIcon color="#ff007b" icon={faHeart} />
      </h1>
      <hr />
      {list.length > 0 ? (
        list.map((val) => (
          <WishCard
            key={val.id}
            title={val.title}
            id={val.id}
            price={val.price}
            removeFromlist={removeFromlist}
          />
        ))
      ) : (
        <div><h4>Your wish list is empty</h4></div>
      )}
      {error && <PageError error={error} loadData={wishlistLoader} />}
      {load&&<FullScreenLoader/>}
    </div>
  );
}

export default Wishlist;
