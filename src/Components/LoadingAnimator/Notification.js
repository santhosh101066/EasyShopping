import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../Redux/Reducer/SendNotification";

function Notification() {
  let { message, color } = useSelector((state) => state.Notification);
  let dispatch = useDispatch();
  let [component, setComponent] = useState(null);
  useEffect(() => {
    if (message) {
      setComponent(
        <div style={{ color }} className="notification">
          <span>{message}</span>
          <hr />
        </div>
      );
      setTimeout(() => {
        setComponent(null);
        dispatch(clearNotification());
      }, 5000);
    }
  }, [message, color, dispatch]);
  return component;
}

export default Notification;
