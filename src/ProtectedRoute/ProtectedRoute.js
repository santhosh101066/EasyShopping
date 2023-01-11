import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../Redux/Reducer/LoginBtn";
import { notifyUser } from "../Redux/Reducer/SendNotification";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const isLogin = useSelector((state) => state.Authentication.isLogin);
  const dispatch = useDispatch();
  useEffect(() => {
    if(!isLogin){ dispatch(setLogin(true));
    dispatch(notifyUser("Login to Access the page"));
    }
  }, [dispatch, isLogin]);
  if (isLogin) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default ProtectedRoute;
