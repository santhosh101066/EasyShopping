import React, { useCallback, useEffect, useState } from "react";
import '../../CSS/Auth.css'
import "../../CSS/DetailedView.css";
import AxiosApi from "../../Api/AxiosApi";
import { useParams } from "react-router-dom";
import PageError from "../Alert.js/PageError";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import { useDispatch } from "react-redux";
import { notifyUserError } from "../../Redux/Reducer/SendNotification";
import Controls from "./Controls";

function DetailedProduct(props) {
  const db = process.env.REACT_APP_DB;
  let [image, setImage] = useState();
  let [datas, setDatas] = useState(null);
  let [images, setImages] = useState([]);
  
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
          {datas.more_details.split("\n").map((val,index) => val && <li key={index}>{val}</li>)}
        </ul>
      </div>
      <Controls price={datas.price} getQuantity={datas.quantity} id={datas.id}/>
    </div>
  ) : error ? (
    <PageError error={error} loadData={loadContent} />
  ) : (
    <FullScreenLoader />
  );
}

export default DetailedProduct;
