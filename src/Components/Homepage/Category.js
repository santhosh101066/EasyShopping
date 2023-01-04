import React from "react";
import { category } from "../../Data/ProductData";
import { useNavigate } from "react-router-dom";

function Category(props) {
    const navigate=useNavigate()
  const displayCategory = category.map((val, index) => (
    <div role={'button'} tabIndex={1} key={index} onClick={()=>{navigate('/product/'+val.name)}}>
      <img src={val.icon} alt={val.name}></img>
      <span>{val.name}</span>
    </div>
  ));
  return <div className="home-category">{displayCategory}</div>;
}

export default Category;
