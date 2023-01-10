import React, {createRef } from "react";
import AxiosApi from "../../Api/AxiosApi";
import "../../CSS/AddProduct.css";
import { useDispatch } from "react-redux";
import { notifyUser, notifyUserError } from "../../Redux/Reducer/SendNotification";

function AddProduct() {
  const FormDatas = createRef();
const dispatch=useDispatch()
  function CreateProduct(e) {
    const data = new FormData(FormDatas.current);
    AxiosApi.post("newproduct", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(() => {
        dispatch(notifyUser("Product Added Sucessfully"))
        FormDatas.current.reset()
    })
    .catch(err=>{
        dispatch(notifyUserError(err.message))  
    });
    
    e.preventDefault();
  }

  return (
    <div className="add-product">
      <h3>Add New Product</h3>
      <form ref={FormDatas} onSubmit={CreateProduct}>
        <input type={"text"} name="short_title" placeholder="Short Title" required/>
        <input type={"text"} name="title" placeholder="Title" required/>
        <input type={"number"} name="quantity" placeholder="Quantity" required/>
        <textarea name="more_details" placeholder="More Details" required />
        <select name="category" required>
          <option value="">Select Category</option>
          <option value="laptop">Laptop</option>
          <option value="mobile">Mobile</option>
          <option value="tv">Television</option>
          <option value="headphone">Headphone</option>
        </select>
        <input type={"number"} name="price" placeholder="Price" required />
        <br />
        <label htmlFor="main">Main Image</label>
        <input id="main" type={"file"} name="main_image" accept="image/*" required/>
        <br />
        <label htmlFor="other">Other Images</label>
        <input
          id="other"
          type={"file"}
          name="other_image"
          accept="image/*"
          multiple
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
