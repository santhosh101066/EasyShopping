import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";

const Authenticate = React.lazy(() => import("../LogIn/Authenticate"));
function Header() {
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  return (
    <div className={show ? "header show-content" : "header hide-content"}>
      <nav>
        <ul>
          <li className="app-title">
            <div className="banner" onClick={() => navigate("/")}>
              <img src="/assets/logo/logoalone.png" alt="logo"></img>
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
          <li>Wish List</li>
          <li>My Cart</li>
          <li onClick={() => setLogin(true)}>Login</li>
          <li><FontAwesomeIcon icon={faUserCircle} size='2x'/></li>
          <div onClick={() => setShow((val) => !val)} className="icon">
            <FontAwesomeIcon icon={faBars} />
          </div>
        </ul>
      </nav>
      <Suspense fallback={<FullScreenLoader />}>
        {login && <Authenticate setLogin={setLogin} />}
      </Suspense>
    </div>
  );
}

export default Header;
