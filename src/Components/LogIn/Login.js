import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  notifyUser,
  notifyUserError,
} from "../../Redux/Reducer/SendNotification";
import AxiosApi from "../../Api/AxiosApi";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import { setAdmin, setCartNumber, setName, setUserLogin } from "../../Redux/Reducer/AuthKey";
import { setLogin } from "../../Redux/Reducer/LoginBtn";

function Login({ setSignup }) {
  const formData = useRef();
  const dispatch = useDispatch();
  let [load, setLoad] = useState(false);
  let [invalid, setInvalid] = useState(false);

  function handleLogin(e) {
    const email = formData.current.email;
    const password = formData.current.password;
    if (email.value) {
      if (password.value) {
        setLoad(true);
        AxiosApi.post("login", { email: email.value, password: password.value })
          .then((res) => {
            setLoad(false);
            dispatch(notifyUser("Login Sucessfull"));
            dispatch(setLogin(false));
            AxiosApi.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.token;
            localStorage.setItem("auth", res.data.token);
            AxiosApi.get('cartcount').then(res=>{
              dispatch(setCartNumber(res.data.length))
          })
            res.data.type === "admin"
              ? dispatch(setAdmin(true))
              : dispatch(setUserLogin());
            dispatch(setName(res.data.first_name))
          })
          .catch((err) => {
            setLoad(null);
            if (err.response) {
              setInvalid(true);
              dispatch(notifyUserError(err.response.statusText));
              return;
            }
            console.log(err);
            dispatch(notifyUserError(err.message));
          });
      } else {
        password.setCustomValidity("Required");
        dispatch(notifyUserError("Password field required"));
      }
    } else {
      email.setCustomValidity("Required");
      dispatch(notifyUserError("Email field required"));
    }
    e.preventDefault();
  }
  return (
    <div className="login-text">
      <form
        ref={formData}
        onSubmit={handleLogin}
        onChange={() => {
          formData.current.email.setCustomValidity("");
          formData.current.password.setCustomValidity("");
        }}
      >
        <input type={"email"} name="email" placeholder="Email" pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$" />
        <input type={"password"} name="password" placeholder="Password" />
        {invalid && (
          <span className="invalid">Invalid username or password</span>
        )}
        <button type="submit">Login</button>
        <span>
          New user?{" "}
          <Link
            to={"#"}
            onClick={(e) => {
              e.preventDefault();
              setSignup(true);
            }}
          >
            Click here
          </Link>{" "}
          to register.
        </span>
      </form>
      {load && <FullScreenLoader />}
    </div>
  );
}

export default Login;
