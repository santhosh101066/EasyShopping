import React from "react";
import Categorize from "./Categorize";

function Homepage(props) {
  const laptops = [
    { title: "ASUS VivoBook 15 (2021)", image: "p1.jpg", price: 25400, category:'laptop' },
    { title: "Dell Inspiron 3520 Laptop", image: "p2.jpg", price: 55400,category:'laptop' },
    { title: "ASUS VivoBook 15 (2021)", image: "p1.jpg", price: 25400 ,category:'laptop'},
    { title: "Dell Inspiron 3520 Laptop", image: "p2.jpg", price: 55400,category:'laptop' },
    { title: "ASUS VivoBook 15 (2021)", image: "p1.jpg", price: 25400,category:'laptop' },
    { title: "Dell Inspiron 3520 Laptop", image: "p2.jpg", price: 55400,category:'laptop' },
  ];
  const mobile = [
    { title: "realme narzo 50i", image: "m1.jpg", price: 6999 ,category:'mobile'},
    { title: "Redmi 10A", image: "m2.jpg", price: 8299 ,category:'mobile'},
    { title: "realme narzo 50i", image: "m1.jpg", price: 6999 ,category:'mobile'},
    { title: "Redmi 10A", image: "m2.jpg", price: 8299 ,category:'mobile'},
    
  ];
  return (
    <div>
      <Categorize category={"Laptop"} products={laptops} />
      <Categorize category={"Mobile"} products={mobile} />
    </div>
  );
}

export default Homepage;
