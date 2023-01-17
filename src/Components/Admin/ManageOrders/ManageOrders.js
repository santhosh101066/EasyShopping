import React, { useCallback, useEffect, useState } from "react";
import AxiosApi, { SERVER } from "../../../Api/AxiosApi";
import PriceFormat from "../../StringFormat/PriceFormat";
import { useDispatch } from "react-redux";
import { notifyUser } from "../../../Redux/Reducer/SendNotification";
import CustomerDetails from "./CustomerDetails";
import "../../../CSS/Auth.css";

function ManageOrders(props) {
  const [list, setList] = useState([]);
  const [details, setDetails] = useState(null);
  const dispatch = useDispatch();

  const initialize = useCallback(() => {
    AxiosApi.get("adminorder").then((res) => setList(res.data.reverse()));
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const handleChanges = useCallback(
    (e, val) => {
      const status = e.target.value;
      console.log(e.target.value, val);
      AxiosApi.put("adminorder/" + val.id, {
        user_id: val.user_id,
        quantity: val.quantity,
        status,
        p_id: val.p_id,
        address: val.address,
      }).then(() => {
        dispatch(notifyUser("Changes Updated"));
      });
    },
    [dispatch]
  );

  return (
    <div>
      {list.map((val) => (
        <div key={val.id} className="order">
          <div className="order-main">
            <img src={`${SERVER}/assets/images/${val.p_id}.png`} alt="mobile" />
            <h3>{val.title}</h3>
          </div>
          <div className="order-info">
            <span>Quantity : {val.quantity}</span>
            <span>
              Price: <PriceFormat price={Number(val.price) * val.quantity} />
            </span>
            <select
              defaultValue={val.status}
              onChange={(e) => handleChanges(e, val)}
            >
              <option value={"Order Placed"}>Order Placed</option>
              <option value={"Shipped"}>Shipped</option>
              <option value={"Dispatched"}>Dispatched</option>
              <option value={"Out for delivery"}>Out for delivery</option>
              <option value={"Delivered"}>Delivered</option>
              <option value={"Cancelled"}>Cancel order</option>
            </select>
            <button
              onClick={() => {
                setDetails(
                  <CustomerDetails
                    close={setDetails}
                    address={val.address}
                    user_id={val.user_id}
                  />
                );
              }}
            >
              Details
            </button>
          </div>
        </div>
      ))}
      {details}
    </div>
  );
}

export default ManageOrders;
