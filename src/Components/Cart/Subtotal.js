import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import PriceFormat from "../StringFormat/PriceFormat";
import AddressGetter from "../Popup/AddressGetter";

function Subtotal({ data, reload }) {
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState(false);
  
  useEffect(() => {
    data.forEach((val) =>
      setTotal((total) => total + Number(val.price) * val.quantity)
    );
    return () => {
      setTotal(0);
    };
  }, [data]);

  return (
    <div>
      <div className="subtotal">
        <div className="info">
          <span>
            Subtotal ({data.length} items) : <PriceFormat price={total} />
          </span>
          <button
            onClick={() => {
              setAddress(true);
            }}
          >
            Buy Now <FontAwesomeIcon icon={faShoppingBag} />
          </button>
        </div>
      </div>
      <hr />
      {address && (
        <AddressGetter
          list={data}
          reload={reload}
          cancel={() => {
            setAddress(false);
          }}
        />
      )}
    </div>
  );
}

export default Subtotal;
