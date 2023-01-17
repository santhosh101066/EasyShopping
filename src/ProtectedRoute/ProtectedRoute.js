import { useDispatch } from "react-redux";
import { setLogin } from "../Redux/Reducer/LoginBtn";
import { notifyUser } from "../Redux/Reducer/SendNotification";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children ,isLogin }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLogin) {
      dispatch(setLogin(true));
      dispatch(notifyUser("Login to Access the page"));
    } else {
      dispatch(setLogin(false));
    }
  }, [dispatch, isLogin]);

  return isLogin ? children :<Navigate to={'/'}/>;
}

export default ProtectedRoute;
