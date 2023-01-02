import React from "react";
import "../../CSS/SeeMore.css";
import { useNavigate } from "react-router-dom";
function SeeMore({category}) {
    const navigate=useNavigate()
  return (
    <div className="see-more">
      <img onClick={()=>navigate('product?category=test')}
        src="https://img.icons8.com/external-kmg-design-glyph-kmg-design/62/8B4EB4/external-right-arrows-kmg-design-glyph-kmg-design.png"
        alt="see_more"
      />
      <span>See More</span>
    </div>
  );
}

export default SeeMore;
