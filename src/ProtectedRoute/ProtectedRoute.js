import { useDispatch } from "react-redux";
import { setLogin } from "../Redux/Reducer/LoginBtn";
import { notifyUser } from "../Redux/Reducer/SendNotification";
import { useEffect } from "react";
import Homepage from "../Components/Homepage/Homepage";

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

  return isLogin ? children : <Homepage />;
}

export default ProtectedRoute;
