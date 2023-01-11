import React, { useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../../CSS/DetailedView.css";
import AxiosApi from "../../Api/AxiosApi";
import { useParams } from "react-router-dom";
import PriceFormat from "../StringFormat/PriceFormat";
import PageError from "../Alert.js/PageError";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import { useDispatch } from "react-redux";
import { notifyUserError } from "../../Redux/Reducer/SendNotification";

function DetailedProduct(props) {
  const db = process.env.REACT_APP_DB;
  let [image, setImage] = useState();
  let [datas, setDatas] = useState(null);
  let [images, setImages] = useState([]);
  let [quantity, setQuantity] = useState(1);
  let [error, setError] = useState();
  const param = useParams();
  const dispatch = useDispatch()

  const handleClickImage = useCallback((e) => {
    setImage(e.target.src);
  }, []);

  const loadContent = useCallback(() => {
    AxiosApi.get("product/detailed/" + param.productId)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setImage(`${db}/assets/images/${data.id}.png`);
        setImages(() => {
          const img = [];
          for (let index = 0; index < data.filesCount; index++) {
            img.push(
              <img
                key={index}
                src={`${db}/assets/images/${data.id}_${index}_.png`}
                alt=""
              />
            );
          }
          return img;
        });
        // setQuantity(Number(data.quantity))
        setDatas(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        dispatch(notifyUserError(err.message))
      });
  }, [db, dispatch, param.productId]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  return datas ? (
    <div className="detailed-product">
      <div className="thumb-images">
        <div className="thumbs" onClick={handleClickImage}>
          {/* thumb img */}
          <img src={`${db}/assets/images/${datas.id}.png`} alt="" />
          {images}
        </div>
      </div>

      <div className="product-image">
        {/* Product img */}
        <img src={image} alt="" />
      </div>
      <div className="product-details">
        <h2>{datas.title}</h2>
        <h4>More details</h4>
        <ul>
          {datas.more_details.split("\n").map((val) => val && <li>{val}</li>)}
        </ul>
      </div>
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
                quantity < Number(datas.quantity) && setQuantity(quantity + 1);
              }}
              disabled={quantity === Number(datas.quantity) ? true : false}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <h3>
            <PriceFormat price={Number(datas.price) * quantity} />
          </h3>
        </div>
        <div className="controls">
          <button>
            Add to Cart <FontAwesomeIcon icon={faAdd} />
          </button>
          <button>
            Buy Now <FontAwesomeIcon icon={faCartShopping} />
          </button>
          <button>
            Add to Wish List <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </div>
  ) : error ? (
    <PageError error={error} loadData={loadContent} />
  ) : (
    <FullScreenLoader />
  );
}

export default DetailedProduct;
