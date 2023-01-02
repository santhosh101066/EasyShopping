import React from "react";
import { Link } from "react-router-dom";

function Signup({ setSignup }) {
  return (
    <div className="signup-text">
      <div>
        <input type={"text"} placeholder="First Name" />
      </div>
      <div>
        <input type={"text"} placeholder="Last Name" />
      </div>
      <div>
        <input type={"tel"} placeholder="Mobile No." />
      </div>
      <div>
        <input type={"email"} placeholder="Email" />
      </div>
      <div>
        <input type={"password"} placeholder="Password" />
      </div>
      <div>
        <input type={"password"} placeholder="Confirm Password" />
      </div>
      <button>Signup</button>
      <span>
        Already user?{" "}
        <Link
          to={"#"}
          onClick={(e) => {
            e.preventDefault();
            setSignup(false);
          }}
        >
          Click here
        </Link>{" "}
        to Login.
      </span>
    </div>
  );
}

export default Signup;
