import { BrowserRouter } from "react-router-dom";
import Notification from "./Components/LoadingAnimator/Notification";
import Footer from "./Components/Footer/Footer";
import Routers from "./Components/Routes/Routers";
import Header from "./Components/Header/Header";
import "./CSS/App.css"; 
import AutoLogin from "./Components/LogIn/AutoLogin";

function App() {
 
  return (
    <div className="App">
      <AutoLogin/>
      <Notification />
      <BrowserRouter>
        <Header />
        <Routers />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
