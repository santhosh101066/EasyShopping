import React from "react";
import Homepage from "../Homepage/Homepage";
import ProductPage from "../Product/ProductPage";
import DetailedProduct from "../Product/DetailedProduct";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute";
import Wishlist from "../WishList/Wishlist";
import Order from "../Orders/Order";
import AddtoCart from "../Cart/AddtoCart";
import ManageOrders from "../Admin/ManageOrders/ManageOrders";
import SearchPage from "../Search/SearchPage";
import PageNotFound from "../Alert/PageNotFound";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function Routers(props) {
  const isLogin = useSelector((state) => state.Authentication.isLogin);
  const isAdmin = useSelector((state) => state.Authentication.isAdmin);
  
  return (
    <Routes>
      <Route index element={<Homepage />}></Route>
      <Route path="search" element={<SearchPage/>}></Route>
      <Route path="products/:type" element={<ProductPage />}></Route>
      <Route path="view/:productId" element={<DetailedProduct />}></Route>
      <Route
        path="wishlist"
        element={
          <ProtectedRoute isLogin={isLogin}>
            <Wishlist />
          </ProtectedRoute>
        }
      />
      <Route
        path="cart"
        element={
          <ProtectedRoute isLogin={isLogin}>
            <AddtoCart />
          </ProtectedRoute>
        }
      />
      <Route
        path="orders"
        element={
          <ProtectedRoute isLogin={isLogin}>
            <Order />
          </ProtectedRoute>
        }
      />

      {/* <Route
        path="addproduct"
        element={
          <ProtectedRoute isLogin={isAdmin}>
            <AddProduct />
          </ProtectedRoute>
        }
      /> */}
      <Route
        path="order"
        element={
          <ProtectedRoute isLogin={isAdmin}>
            <ManageOrders />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound/>} />
    </Routes>
  );
}

export default Routers;
