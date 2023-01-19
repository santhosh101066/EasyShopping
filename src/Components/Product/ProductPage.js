import React, { useCallback, useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import Categorize from "./Categorize";
import AxiosApi from "../../Api/AxiosApi";
import { useDispatch } from "react-redux";
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import PageError from "../Alert.js/PageError";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import captalize from "../StringFormat/Captalize";


function ProductPage(props) {
  const getParam = useParams();
  const [product, getProduct] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [loading,setLoading]=useState()
  const loadData = useCallback(
    function () {
      setLoading(<FullScreenLoader/>)
      AxiosApi.get("product/basic/" + getParam.type)
        .then((res) => {
          getProduct(res.data);
          setError(null);
          setLoading(null)
        })
        .catch((err) => {
          dispatch(notifyUser(err.message));
          err.response
            ? setError(err.response.statusText)
            : setError(err.message);
          setLoading(null)
        });
    },
    [dispatch, getParam.type]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return error?<PageError error={error} loadData={loadData}/>: loading || <Categorize category={captalize(getParam.type + "s")} load={loadData} products={product} />

}

export default ProductPage;
