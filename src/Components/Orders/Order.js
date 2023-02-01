import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AxiosApi, { SERVER } from "../../Api/AxiosApi";
import PriceFormat from "../StringFormat/PriceFormat";
import { useNavigate } from "react-router-dom";
import "../../CSS/Orders.css";

function Order(props) {

  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.Authentication.isLogin);

  const loader = useCallback(() => {
    if (isLogin) {
      AxiosApi.get("orders").then((res) => setList(res.data.reverse()));
    }
  }, [isLogin]);

  useEffect(() => {
    loader();
  }, [isLogin, loader]);
  
  return (
    <div>
      {list.map((val, index) => (
        <div
          key={index}
          className="order"
          onClick={() => {
            navigate("/view/" + val.p_id);
          }}
        >
          <div className="order-main">
            <img src={`${SERVER}/assets/images/${val.p_id}.png`} alt="mobile" />
            <h3>{val.title}</h3>
          </div>
          <div className="order-info">
            <span>Quantity : {val.quantity}</span>
            <span>
              Price: <PriceFormat price={Number(val.price) * val.quantity} />
            </span>
            <span>Status: {val.status}</span>
            {/* <button>Request cancelation</button> */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
