import { BrowserRouter} from "react-router-dom";
import Header from "./Components/Header/Header";
import Notification from "./Components/LoadingAnimator/Notification";
import Footer from "./Components/Footer/Footer";
import "./CSS/App.css";
import { useEffect } from "react";
import AxiosApi from "./Api/AxiosApi";
import { useDispatch } from "react-redux";
import { notifyUser } from "./Redux/Reducer/SendNotification";
import Routers from "./Components/Routes/Routers";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      AxiosApi.get("validate").then(() => {
        dispatch(notifyUser("You are logged in"));
      });
    }
  }, [dispatch]);
  return (
    <div className="App">
      <Notification />
      <BrowserRouter>
        <Header />
          <Routers/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
