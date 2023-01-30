import React, { Suspense, createRef, useEffect, useState } from "react";
import FullScreenLoader from "../LoadingAnimator/FullScreenLoader";
import { useNavigate } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { removeUserLogin, setAdmin } from "../../Redux/Reducer/AuthKey";
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import { setLogin } from "../../Redux/Reducer/LoginBtn";
import { category } from "../../Data/ProductData";
import Search from "../Search/Search";

const Authenticate = React.lazy(() => import("../LogIn/Authenticate"));

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [toggleCategory, setToggleCategory] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const [getWidth, setWidth] = useState(false);
  const comp = createRef();
  const login = useSelector((state) => state.loginBtn.openLogin);
  const userName = useSelector((state) => state.Authentication.name);
  const isAdmin = useSelector((state) => state.Authentication.isAdmin);
  const isLogin = useSelector((state) => state.Authentication.isLogin);
  const cartNo = useSelector((state) => state.Authentication.cartNo);

  useEffect(() => {
    function widthManage() {
      if (window.innerWidth > 780) {
        setWidth(false);
      } else {
        setWidth(true);
      }
    }
    widthManage();
    window.addEventListener("resize", widthManage);
    return () => {
      window.removeEventListener("resize", widthManage);
    };
  }, [comp]);

  return (
    <header className={show ? "header show-content" : "header hide-content"}>
      <nav>
        <ul className="head-ul">
          <li className="app-title">
            <div
              className="banner"
              onClick={() => {
                navigate("/");
                setShow((val) => false);
              }}
            >
              <img src="/assets/logo/logoalone192.png" alt="logo"></img>
              <div className="header-title">
                <span>Easy Shopping</span>
                <span>For Electronics</span>
              </div>
            </div>
          </li>

          <Search />

          <div
            className="category"
            onClick={() => setToggleCategory(!toggleCategory)}
          >
            <li>
              <span>Category</span>
            </li>
            <div
              style={
                getWidth ? { display: toggleCategory ? "block" : "none" } : {}
              }
              className="drop-content"
            >
              {/* <li>Laptop</li>
              <li>Mobile</li> */}
              {category.map((val) => (
                <li
                  key={val.id}
                  onClick={() => {
                    navigate("products/" + val.id);
                    setShow(false);
                  }}
                >
                  {val.name}
                </li>
              ))}
            </div>
          </div>
          {isLogin ? (
            <>
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
                <div className="cart-number">
                  <span>{cartNo}</span>
                </div>
              </li>

              <div
                className="category"
                onClick={() => setToggleProfile(!toggleProfile)}
              >
                <li>
                  {/* <FontAwesomeIcon icon={faUserCircle} size="2x" /> */}
                  <div className="profile">
                    <span>{userName[0].toUpperCase()}</span>
                  </div>
                </li>
                <div
                  style={
                    getWidth
                      ? { display: toggleProfile ? "block" : "none" }
                      : {}
                  }
                  className="drop-content"
                >
                  <li
                    onClick={() => {
                      dispatch(setAdmin(false));
                      setShow((val) => false);
                      dispatch(removeUserLogin());
                      dispatch(notifyUser("You Have been Logged out"));
                    }}
                  >
                    LogOut
                  </li>
                  <li
                    onClick={() => {
                      setShow((val) => false);
                      navigate("orders");
                    }}
                  >
                    Your Order
                  </li>
                </div>
              </div>
            </>
          ) : (
            isAdmin || (
              <li
                onClick={() => {
                  setShow((val) => false);
                  dispatch(setLogin(true));
                  setShow((val) => !val);
                }}
              >
                Login
              </li>
            )
          )}
          {isAdmin && (
            <>
              <li
                onClick={() => {
                  navigate("addproduct");
                  setShow(false);
                }}
              >
                Add Product
              </li>
              <li
                onClick={() => {
                  navigate("order");
                  setShow(false);
                }}
              >
                Orders
              </li>
              <div
                className="category"
                onClick={() => {
                  setToggleProfile(!toggleProfile);
                }}
              >
                <li>
                  {/* <FontAwesomeIcon icon={faUserCircle} size="2x" /> */}
                  <div className="profile">
                    <span>{userName[0].toUpperCase()}</span>
                  </div>
                </li>
                <div
                  style={
                    getWidth
                      ? { display: toggleProfile ? "block" : "none" }
                      : {}
                  }
                  className="drop-content"
                >
                  <li
                    onClick={() => {
                      dispatch(setAdmin(false));
                      dispatch(removeUserLogin());
                      setShow(false);
                      dispatch(notifyUser("You Have been Logged out"));
                    }}
                  >
                    LogOut
                  </li>
                </div>
              </div>
            </>
          )}

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
