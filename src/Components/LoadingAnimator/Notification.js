import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../Redux/Reducer/SendNotification";

var timeout;
function Notification() {
  let { message, color } = useSelector((state) => state.Notification);
  let dispatch = useDispatch();
  let [component, setComponent] = useState(null);
  useEffect(() => {
    if (message) {
      clearTimeout(timeout);
      setComponent(
        <div style={{ color }} className="notification">
          <span>{message}</span>
          <hr />
        </div>
      );
      timeout = setTimeout(() => {
        setComponent(null);
        dispatch(clearNotification());
      }, 5000);
    }
  }, [message, color, dispatch]);
  return component;
}

export default Notification;
