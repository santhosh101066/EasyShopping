import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import PriceFormat from "../StringFormat/PriceFormat";

function Subtotal({ data }) {
  const [total,setTotal]=useState(0)
  useEffect(()=>{
    data.forEach(
      (val) =>setTotal(total=> total + (Number(val.price) * val.quantity))
    )
    return ()=>{
      setTotal(0)
    }
  },[data])
  return (
    <div>
      <div className="subtotal">
        <div className="info">
          <span>
            Subtotal ({data.length} items) :{" "}
            <PriceFormat
              price={total}
            />
          </span>
          <button>
            Buy Now <FontAwesomeIcon icon={faShoppingBag} />
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Subtotal;
