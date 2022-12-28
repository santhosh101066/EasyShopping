import React from "react";
import {useNavigate } from "react-router-dom";



function Header(props) {
    const navigate=useNavigate()
  return (
    <div className="header">
      <nav>
        <ul>
          <li  style={{padding:0,marginLeft:'20px'}} className="app-title">Easy Shopping</li>
          <li onClick={()=>navigate('/')}>Home</li>
          <div className="category">
            <li><span>Category</span></li>
            <div className="drop-content">
              <li>Laptop</li>
              <li>Mobile</li>
            </div>
          </div>
          <li>Wish List</li>
          <li>My Cart</li>
          <li>Login</li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
