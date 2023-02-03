import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AxiosApi from "../../Api/AxiosApi";
import {
  initialLoad,
  removeUserLogin,
  setAdmin,
  setCartNumber,
  setName,
  setUserLogin,
} from "../../Redux/Reducer/AuthKey";
import { notifyUser } from "../../Redux/Reducer/SendNotification";

function AutoLogin(props) {
  const dispatch = useDispatch();
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      AxiosApi.get("validate", {
        headers: {
          Authorization:
            localStorage.getItem("auth") &&
            `Bearer ${localStorage.getItem("auth")}`,
        },
      })
        .then((res) => {
          AxiosApi.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("auth")}`;
          res.data.type === "admin"
            ? dispatch(setAdmin(true))
            : dispatch(setUserLogin());
          dispatch(setName(res.data.first_name));
          dispatch(notifyUser("You are logged in"));
          AxiosApi.get("cartcount").then((res) => {
            dispatch(setCartNumber(res.data.length));
          });
          dispatch(initialLoad())
        })
        .catch((err) => {
          if (err.response) {
            if (err.response.status === 401) {
              dispatch(notifyUser(err.response.statusText));
              dispatch(removeUserLogin());
              dispatch(initialLoad())
            }
          } else {
            dispatch(notifyUser(err.message + ": Unable to login"));
            setTimeout(() => {
              setRetry(retry + 1);
            }, 6000);
          }
        });
    }
  }, [dispatch, retry]);

  return null;
}

export default AutoLogin;
