import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Homepage from "./Components/Homepage/Homepage";
import ProductPage from "./Components/Product/ProductPage";
import DetailedProduct from "./Components/Product/DetailedProduct";
import Notification from "./Components/LoadingAnimator/Notification";
import Wishlist from "./Components/WishList/Wishlist";
import Footer from "./Components/Footer/Footer";
import "./CSS/App.css";
import AddtoCart from "./Components/AddToCart/AddtoCart";

function App() {
  return (
    <div className="App">
      <Notification />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="product/:type" element={<ProductPage />}>
            <Route path=":productId" element={<DetailedProduct />}></Route>
          </Route>
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="cart" element={<AddtoCart />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
