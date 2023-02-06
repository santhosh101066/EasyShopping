import AxiosApi from "../../../Api/AxiosApi";
import React, { createRef } from "react";
import { useDispatch } from "react-redux";
import {
  notifyUser,
  notifyUserError,
} from "../../../Redux/Reducer/SendNotification";
import "../../../CSS/AddProduct.css";
import "../../../CSS/Auth.css";

function AddProduct({close}) {
  const FormDatas = createRef();
  const dispatch = useDispatch();

  function CreateProduct(e) {
    const data = new FormData(FormDatas.current);
    console.log(data);
    AxiosApi.post("newproduct", data, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(() => {
        dispatch(notifyUser("Product Added Sucessfully"));
        FormDatas.current.reset();
      })
      .catch((err) => {
        dispatch(notifyUserError(err.message));
      });

    e.preventDefault();
  }

  return (
    <div className="auth">
      <div className="add-product">
        <div className="addproduct-align">
          <h3>Add New Product</h3>
          <form ref={FormDatas} onSubmit={CreateProduct}>
            <input
              type={"text"}
              min={10}
              name="short_title"
              placeholder="Short Title"
              required
            />
            <input
              type={"text"}
              min={30}
              name="title"
              placeholder="Title"
              required
            />
            <input
              type={"number"}
              min={5}
              name="quantity"
              placeholder="Quantity"
              required
            />
            <textarea
              name="more_details"
              minLength={200}
              placeholder="More Details"
              required
            />
            <select name="category" required>
              <option value="">Select Category</option>
              <option value="laptop">Laptop</option>
              <option value="mobile">Mobile</option>
              <option value="television">Television</option>
              <option value="headphone">Headphone</option>
            </select>
            <input
              type={"number"}
              name="price"
              min={500}
              placeholder="Price"
              required
            />
            <label htmlFor="main">Main Image</label>
            <input
              id="main"
              type={"file"}
              name="main_image"
              accept="image/*"
              required
            />
            <label htmlFor="other">Other Images</label>
            <input
              id="other"
              type={"file"}
              name="other_image"
              accept="image/*"
              multiple
              required
            />
            <button data-testid="addProduct" type="submit">
              Add Product
            </button>
          </form>
          <span className="close-auth" onClick={() =>{close(false)}}>
          X
        </span>
        </div>
      </div>
    </div>
    //    <div className="add-product">
    //    <h3>Add New Product</h3>
    //    <form ref={FormDatas} onSubmit={CreateProduct}>
    //      <input
    //        type={"text"}
    //        min={10}
    //        name="short_title"
    //        placeholder="Short Title"
    //        required
    //      />
    //      <input
    //        type={"text"}
    //        min={30}
    //        name="title"
    //        placeholder="Title"
    //        required
    //      />
    //      <input
    //        type={"number"}
    //        min={5}
    //        name="quantity"
    //        placeholder="Quantity"
    //        required
    //      />
    //      <textarea
    //        name="more_details"
    //        minLength={200}
    //        placeholder="More Details"
    //        required
    //      />
    //      <select name="category" required>
    //        <option value="">Select Category</option>
    //        <option value="laptop">Laptop</option>
    //        <option value="mobile">Mobile</option>
    //        <option value="television">Television</option>
    //        <option value="headphone">Headphone</option>
    //      </select>
    //      <input
    //        type={"number"}
    //        name="price"
    //        min={500}
    //        placeholder="Price"
    //        required
    //      />
    //      <br />
    //      <label htmlFor="main">Main Image</label>
    //      <input
    //        id="main"
    //        type={"file"}
    //        name="main_image"
    //        accept="image/*"
    //        required
    //      />
    //      <br />
    //      <label htmlFor="other">Other Images</label>
    //      <input
    //        id="other"
    //        type={"file"}
    //        name="other_image"
    //        accept="image/*"
    //        multiple
    //        required
    //      />
    //      <button data-testid="addProduct" type="submit">Add Product</button>
    //    </form>
    //  </div>
  );
}

export default AddProduct;
