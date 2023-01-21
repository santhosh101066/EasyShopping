import React, { useCallback, useEffect, useState } from "react";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import AxiosApi from "../../Api/AxiosApi";
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import PageError from "../Alert.js/PageError";
import Categorize from "../Product/Categorize";
import captalize from "../StringFormat/Captalize";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

function SearchPage(props) {
  const [query] = useSearchParams();
  const [product, getProduct] = useState([]);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
  const loadData = useCallback(
    function () {
      setLoading(<FullScreenLoader />);
      query.get("q")
        ? AxiosApi.get("search/" + query.get("q"))
            .then((res) => {
              getProduct(res.data);
              setError(null);
              setLoading(null);
            })
            .catch((err) => {
              dispatch(notifyUser(err.message));
              err.response
                ? setError(err.response.statusText)
                : setError(err.message);
              setLoading(null);
            })
        : setLoading(null);
    },
    [dispatch, query]
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return error ? (
    <PageError error={error} loadData={loadData} />
  ) : loading || product.length > 0 ? (
    <Categorize
      category={query.get("q") && "Search for " + captalize(query.get("q"))}
      load={loadData}
      products={product}
    />
  ) : (
    <div>
      <span className="home-lable">
        {query.get("q") && "Search for " + captalize(query.get("q"))}
      </span>
      <div>Product Not Found</div>
    </div>
  );
}

export default SearchPage;
