import React from "react";
import Products from "./Products";
import SeeMore from "./SeeMore";

function Categorize({ category, products }) {
  return (
    <div>
      <span className="home-lable">{category}</span>
      <div className="home-container">
        {products&&products.map((product, index) => (
          <Products
            key={index}
            title={product.title}
            img={product.image}
            price={product.price}
          />
        ))}
        <SeeMore />
      </div>
    </div>
  );
}

export default Categorize;