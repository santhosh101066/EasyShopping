import React, { createRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  notifyUser,
  notifyUserError,
} from "../../Redux/Reducer/SendNotification";
import AxiosApi from "../../Api/AxiosApi";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import {
  setAdmin,
  setCartNumber,
  setName,
  setUserLogin,
} from "../../Redux/Reducer/AuthKey";
import { setLogin } from "../../Redux/Reducer/LoginBtn";

function Login({ setSignup }) {
  const emailRef=createRef()
  const passwordRef=createRef()
  const dispatch = useDispatch();
  let [load, setLoad] = useState(false);
  let [invalid, setInvalid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleLogin(e) {
    if (email.length > 0) {
      if (password.length > 0) {
        setLoad(true);
        AxiosApi.post("login", { email, password })
          .then((res) => {
            setLoad(false);
            dispatch(notifyUser("Login Sucessfull"));
            dispatch(setLogin(false));
            AxiosApi.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.token;
            localStorage.setItem("auth", res.data.token);
            AxiosApi.get("cartcount").then((res) => {
              dispatch(setCartNumber(res.data.length));
            });
            res.data.type === "admin"
              ? dispatch(setAdmin(true))
              : dispatch(setUserLogin());
            dispatch(setName(res.data.first_name));
          })
          .catch((err) => {
            setLoad(null);
            if (err.response) {
              setInvalid(true);
              dispatch(notifyUserError(err.response.statusText));
              return;
            }
            dispatch(notifyUserError(err.message));
          });
      } else {
       passwordRef.current.setCustomValidity("Required");
        dispatch(notifyUserError("Password field required"));
      }
    } else {
      emailRef.current.setCustomValidity("Required");
      dispatch(notifyUserError("Email field required"));
    }
    e.preventDefault(); 
  }
  return (
    <div className="login-text">
      <form onSubmit={handleLogin} data-testid="login-form">
        <input
          type={"email"}
          name="email"
          placeholder="Email"
          ref={emailRef}
          pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
          onChange={(e) => {
            e.target.setCustomValidity("");
            setEmail(e.target.value);
          }}
        />
        <input
          type={"password"}
          name="password"
          placeholder="Password"
          ref={passwordRef}
          onChange={(e) => {
            e.target.setCustomValidity("");
            setPassword(e.target.value);
          }}
        />
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
