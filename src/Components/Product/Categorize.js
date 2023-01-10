import React from "react";
import Products from "./Products";

function Categorize({ category, products }) {
  return (
    <div>
      <span className="home-lable">{category}</span>
      <div className="home-container">
        {products &&
          products.map((product, index) => (
            <Products
              key={index}
              id={product.id}
              title={product.title}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
}

export default Categorize;
