import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import ProductPage from "./Components/Product/ProductPage";
import "./CSS/App.css";
import DetailedProduct from "./Components/Product/DetailedProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="product/:type" element={<ProductPage />}></Route>
          <Route path="*" element={<DetailedProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
