import React from "react";
import Carousels from "./Carousels";
import Category from "./Category";
// import { laptops, mobile } from "../../Assets/ProductData";
// import Categorize from "../Product/Categorize";


function Homepage(props) {
  
  return (
    <div>
      <Carousels/>
      <h2>Category</h2>
      <Category/>
      {/* <Categorize category={"Laptop"} products={laptops} />
      <Categorize category={"Mobile"} products={mobile} />
       */}
    </div>
  );
}

export default Homepage;
