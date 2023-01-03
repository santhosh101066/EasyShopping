import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({setLogin}) {
  const [show,setShow]=useState(false)
  const navigate = useNavigate();
  return (
    <div className={show?'header show-content':'header hide-content'}>
      <nav>
        <ul>
          <li className="app-title">
            <img src="/assets/logo/logoalone.png" alt="logo"></img>
            <div className="header-title">
              <span>Easy Shopping</span>
              <span>For Electronics</span>
            </div>
          </li>
          <li onClick={() => navigate("/")}>Home</li>
          <div className="category">
            <li>
              <span>Category</span>
            </li>
            <div className="drop-content">
              <li>Laptop</li>
              <li>Mobile</li>
            </div>
          </div>
          <li>Wish List</li>
          <li>My Cart</li>
          <li onClick={()=>setLogin(true)}>Login</li>
          <div onClick={()=>setShow(val=>!val)} className="icon"><i className="fas fa-bars"></i></div>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
