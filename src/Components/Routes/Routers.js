import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from '../Homepage/Homepage';
import ProductPage from '../Product/ProductPage';
import DetailedProduct from '../Product/DetailedProduct';
import ProtectedRoute from '../../ProtectedRoute/ProtectedRoute';
import Wishlist from '../WishList/Wishlist';
import AddtoCart from '../AddToCart/AddtoCart';
import AddProduct from '../AddProduct/AddProduct';

function Routers(props) {
    return (
        <Routes>
          <Route index element={<Homepage />}></Route>
          <Route path="products/:type" element={<ProductPage />}></Route>
          <Route path="view/:productId" element={<DetailedProduct />}></Route>
          <Route
            path="wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
          <Route
            path="cart"
            element={
              <ProtectedRoute>
                <AddtoCart />
              </ProtectedRoute>
            }
          />
          <Route path='addproduct' element={<AddProduct/>}/>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
    );
}

export default Routers;