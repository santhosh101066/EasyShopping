import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../Redux/Reducer/SendNotification";

function Notification() {
    let message=useSelector((state)=>state.Notification.message)
    let dispatch = useDispatch()
  let [component, setComponent] = useState(null);
  useEffect(() => {
    if (message) {
      setComponent(
        <div className="notification">
          <span>{message}</span>
          <hr />
        </div>
      );
      setTimeout(()=>{setComponent(null); dispatch(clearNotification())},5000);
    }
  }, [message,dispatch]);
  return component;
}

export default Notification;
