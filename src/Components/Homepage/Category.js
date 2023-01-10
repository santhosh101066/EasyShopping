import React from "react";
import { useNavigate } from "react-router-dom";
import { category } from "../../Data/ProductData";

function Category(props) {
  const navigate = useNavigate();
  const displayCategory = category.map((val, index) => (
    <div
      role={"button"}
      tabIndex={1}
      key={index}
      onClick={() => {
        navigate("/products/" + val.id);
      }}
    >
      <img src={val.icon} alt={val.name}></img>
      <span>{val.name}</span>
    </div>
  ));
  return <div className="home-category">{displayCategory}</div>;
}

export default Category;
