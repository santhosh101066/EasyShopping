import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Notification from "./Components/LoadingAnimator/Notification";
import Footer from "./Components/Footer/Footer";
import Routers from "./Components/Routes/Routers";
import Header from "./Components/Header/Header";
import AutoLogin from "./Components/LogIn/AutoLogin";
import Store from "./Redux/Store/Store";
import "./CSS/App.css";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
        <AutoLogin />
        <Notification />
        <BrowserRouter>
          <Header />
          <div className="page-alignment">
            <Routers />
          </div>
          <Footer />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
