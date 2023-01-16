import {
  removeUserLogin,
  setAdmin,
  setName,
  setUserLogin,
} from "./Redux/Reducer/AuthKey";
import { BrowserRouter } from "react-router-dom";
import Notification from "./Components/LoadingAnimator/Notification";
import Footer from "./Components/Footer/Footer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { notifyUser } from "./Redux/Reducer/SendNotification";
import Routers from "./Components/Routes/Routers";
import AxiosApi from "./Api/AxiosApi";
import Header from "./Components/Header/Header";
import "./CSS/App.css";

function App() {
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
        })
        .catch((err) => {
          if (err.response) {
            console.log(err);
            if (err.response.status === 401) {
              dispatch(notifyUser(err.response.statusText));
              dispatch(removeUserLogin());
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
  return (
    <div className="App">
      <Notification />
      <BrowserRouter>
        <Header />
        <Routers />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
