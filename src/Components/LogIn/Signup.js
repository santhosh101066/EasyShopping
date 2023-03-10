import React, { createRef, useCallback, useEffect, useState } from "react";
import AxiosApi from "../../Api/AxiosApi";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  notifyUser,
  notifyUserError,
} from "../../Redux/Reducer/SendNotification";

function Signup({ setSignup }) {
  let [user, setUser] = useState({});
  let [onUpload, setUpload] = useState(null);
  let [passwordValidate, setValidate] = useState({});
  let formData = createRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.password) {
      if (user.password.length > 0) {
        if (user.password === user.confirmPassword) {
          formData.current.confirmPassword.setCustomValidity("");
        } else {
          formData.current.confirmPassword.setCustomValidity(
            "Password dosen't match"
          );
        }
      }
    }
  }, [user, formData]);

  const handlechanges = useCallback((e) => {
    const target = e.target;
    if (target.name === "password") {
      const value = target.value;
      if (value.length > 0) {
        if (value.match("[A-Za-z\\d@$!%*?&]{8,}$")) {
          setValidate((val) => {
            return { ...val, min: "valid" };
          });
        } else {
          setValidate((val) => {
            return { ...val, min: "invalid" };
          });
        }
        if (value.match("(?=.*[@$!%*?&])")) {
          setValidate((val) => {
            return { ...val, special: "valid" };
          });
        } else {
          setValidate((val) => {
            return { ...val, special: "invalid" };
          });
        }

        if (value.match("(?=.*\\d)")) {
          setValidate((val) => {
            return { ...val, number: "valid" };
          });
        } else {
          setValidate((val) => {
            return { ...val, number: "invalid" };
          });
        }
        if (value.match("(?=.*[A-Z])")) {
          setValidate((val) => {
            return { ...val, upper: "valid" };
          });
        } else {
          setValidate((val) => {
            return { ...val, upper: "invalid" };
          });
        }
        if (value.match("(?=.*[a-z])")) {
          setValidate((val) => {
            return { ...val, lower: "valid" };
          });
        } else {
          setValidate((val) => {
            return { ...val, lower: "invalid" };
          });
        }
      } else {
        setValidate({});
      }
    }
    setUser((val) => {
      return { ...val, [target.name]: target.value };
    });
    target.setCustomValidity("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    Array.from(formData.current, (val) => {
      if (val.type !== "submit") {
        if (val.value.length === 0) {
          val.setCustomValidity("Required");
        }
      }
      return 0;
    });
    if (formData.current.checkValidity()) {
      setUpload(<FullScreenLoader />);
      const sendData = user;
      delete sendData.confirmPassword;
      AxiosApi.post("user", sendData)
        .then(() => {
          setUpload(null);
          dispatch(notifyUser("Account Created Sucessfully"));
          setSignup(false);
        })
        .catch((err) => {
          setUpload(null);
          console.log(err);
          dispatch(notifyUserError(err.response.statusText));
        });
    }
  };

  return (
    <form ref={formData} onSubmit={handleSubmit}>
      <div className="signup-text">
        <div className="cover-me">
          <div>
            <input
              type={"text"}
              placeholder="First Name"
              name="first_name"
              minLength={3}
              pattern={"^[A-Za-z]+$"}
              onChange={handlechanges}
            />
          </div>
          <div>
            <input
              type={"text"}
              placeholder="Last Name"
              name="last_name"
              pattern={"^[A-Za-z]+$"}
              onChange={handlechanges}
            />
          </div>
          <div>
            <input
              type={"tel"}
              placeholder="Mobile No."
              name="mobileno"
              onChange={handlechanges}
              pattern={"^[789]\\d{9}$"}
              onInvalid={(e) =>
                e.target.setCustomValidity("Enter valid Mobile Number")
              }
            />
          </div>
          <div>
            <input
              type={"email"}
              placeholder="Email"
              name="email"
              onChange={handlechanges}
              pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
            />
          </div>
          <div>
            <input
              type={"password"}
              placeholder="Password"
              name="password"
              onChange={handlechanges}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            />
            <div className="password-dropdown">
              <ul>
                <li className={passwordValidate.min}>
                  Must contain minimum 8 character
                </li>
                <li className={passwordValidate.number}>
                  Must contain atleast 1 number
                </li>
                <li className={passwordValidate.special}>
                  Must contain atleast 1 special character
                </li>
                <li className={passwordValidate.upper}>
                  Must contain atleast 1 Uppercase character
                </li>
                <li className={passwordValidate.lower}>
                  Must contain atleast 1 Smallercase character
                </li>
              </ul>
            </div>
          </div>
          <div>
            <input
              type={"password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handlechanges}
            />
          </div>
        </div>
        <button type="submit">Signup</button>

        <span>
          Already a user?{" "}
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
      {onUpload}
    </form>
  );
}

export default Signup;
