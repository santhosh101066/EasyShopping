import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/Product.css";
import PriceFormat from "../StringFormat/PriceFormat";
import { SERVER } from "../../Api/AxiosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditProduct from "../Admin/EditProduct/EditProduct";
import { useSelector } from "react-redux";

function Products({ id, title, price, load }) {
  const navigate = useNavigate();
  const isAdmin = useSelector((state) => state.Authentication.isAdmin);
  let [edit, setEdit] = useState();
  let [display, setDisplay] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    setDisplay(
      <>
        <div className="each-product" onClick={() => navigate("/view/" + id)}>
          <img src={SERVER + "/assets/images/" + id + ".png"} alt={title} />
          <span className="p-title">{title}</span>
          <span className="p-price">
            <PriceFormat price={price} />
          </span>
          {isAdmin && (
            <div className="admin-custom">
              <button
                onClick={(e) => {
                  setEdit(<EditProduct cancel={setEdit} id={id} load={load} />);
                  e.stopPropagation();
                }}
              >
                <FontAwesomeIcon icon={faEdit} color="white" />
              </button>
            </div>
          )}
        </div>
        {edit}
      </>
    );
  }, [edit, id, isAdmin, load, navigate, price, title]);

  return display;
}

export default Products;
