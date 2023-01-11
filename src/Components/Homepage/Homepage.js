import React from "react";
import Carousels from "./Carousels";
import Category from "./Category";

function Homepage() {
  return (
    <div>
      <Carousels />
      <h2>Category</h2>
      <Category />
    </div>
  );
}

export default Homepage;
