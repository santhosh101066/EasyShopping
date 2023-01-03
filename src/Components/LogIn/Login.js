import React from "react";
import { Link } from "react-router-dom";

function Login({ setSignup }) {
  return (
    <div className="login-text">
      <input type={"email"} placeholder="Email" />
      <input type={"password"} placeholder="Password" />
      {/* <span className="invalid">Invalid username or password</span> */}
      <button>Login</button>
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
    </div>
  );
}

export default Login;
