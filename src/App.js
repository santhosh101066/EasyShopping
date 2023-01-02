import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./CSS/App.css";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import Authenticate from "./Components/LogIn/Authenticate";
import { useState } from "react";
import ProductPage from "./Components/Product/ProductPage";

function App() {
  const [login,setLogin]=useState(false);
  return (
    <div className="App">
      <BrowserRouter>
        <Header setLogin={setLogin} />
        {login&&<Authenticate setLogin={setLogin}/>}
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="product/:type" element={<ProductPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
