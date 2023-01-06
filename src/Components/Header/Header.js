import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Authenticate = React.lazy(() => import("../LogIn/Authenticate"));

function Header() {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <header className={show ? "header show-content" : "header hide-content"}>
      <nav>
        <ul className="head-ul">
          <li className="app-title">
            <div
              className="banner"
              onClick={() => {
                navigate("/");
                setShow((val) => !val);
              }}
            >
              <img src="/assets/logo/logoalone192.png" alt="logo"></img>
              <div className="header-title">
                <span>Easy Shopping</span>
                <span>For Electronics</span>
              </div>
            </div>
          </li>
          <div className="category">
            <li>
              <span>Category</span>
            </li>
            <div className="drop-content">
              <li>Laptop</li>
              <li>Mobile</li>
            </div>
          </div>
          <li
            onClick={() => {
              navigate("wishlist");
              setShow((val) => !val);
            }}
          >
            Wish List
          </li>
          <li
            onClick={() => {
              navigate("cart");
              setShow((val) => !val);
            }}
          >
            My Cart
          </li>
          <li
            onClick={() => {
              setLogin(true);
              setShow((val) => !val);
            }}
          >
            Login
          </li>
          <li>
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
          </li>
          <div onClick={() => setShow((val) => !val)} className="icon">
            <FontAwesomeIcon icon={faBars} />
          </div>
        </ul>
      </nav>
      <Suspense fallback={<FullScreenLoader />}>
        {login && <Authenticate setLogin={setLogin} />}
      </Suspense>
    </header>
  );
}

export default Header;
