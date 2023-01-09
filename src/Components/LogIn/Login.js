import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  notifyUser,
  notifyUserError,
} from "../../Redux/Reducer/SendNotification";
import AxiosApi from "../../Api/AxiosApi";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import { setUserLogin } from "../../Redux/Reducer/AuthKey";
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
            AxiosApi.defaults.headers.common['Authorization']="Bearer "+res.data
            localStorage.setItem("auth", res.data);
            dispatch(setUserLogin())
          })
          .catch((err) => {
            setLoad(null);
            setInvalid(true);
            console.log(err);
            dispatch(notifyUserError(err.response.statusText));
          });

        // AxiosApi.get(
        //   "user?email=" + email.value + "&password=" + password.value
        // )
        //   .then((res) => {
        //     console.log(res.data);
        //     if (res.data.length > 0) {
        //       localStorage.setItem("auth", encode(res.data[0].email));
        //       setLoad(false);
        //       dispatch(notifyUser("Login Sucessfull"));
        //       setLogin(false);
        //     } else {
        //       email.setCustomValidity("Required");
        //       password.setCustomValidity("Required");
        //       dispatch(notifyUserError("Incorrect Email or password"));
        //       setLoad(false);
        //     }
        //   })
        //   .catch((err) => {
        //     setLoad(null);
        //     dispatch(notifyUserError(err.message));
        //   });
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
        <input type={"email"} name="email" placeholder="Email" />
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
