import React, { useCallback, useEffect, useState } from "react";
import AxiosApi from "../../../Api/AxiosApi";
import { useDispatch } from "react-redux";
import {
  notifyUser,
  notifyUserError,
} from "../../../Redux/Reducer/SendNotification";
import "../../../CSS/Auth.css";
import "./Edit.css";

function EditProduct({ cancel, id, load }) {
  const [data, setData] = useState();
  const [filled, setNotFilled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    AxiosApi.get("product/detailed/" + id).then((res) => {
      setData(res.data);
    });
  }, [id]);
  const handleSave = useCallback(() => {
    if (!filled) {
      if (window.confirm("Are you sure to update details")) {
        AxiosApi.put("product/" + id, data).then((res) => {
          load();
          cancel(false);
          dispatch(notifyUser("Updated Sucessfully"));
        });
      }
    } else {
      dispatch(notifyUserError("All Fields Are Required"));
    }
  }, [filled, id, data, load, cancel, dispatch]);

  const handleChanges = useCallback((e) => {
    const target = e.target;
    setData((val) => {
      target.value.length > 0 ? setNotFilled(false) : setNotFilled(true);
      val[target.name] = target.value;
      return val;
    });
  }, []);

  return (
    data && (
      <div className="auth">
        <div className="login">
          <h3>Edit Product</h3>
          <div className="login-text">
            <table>
              <tbody>
                <tr>
                  <td>
                    <label>Short Title : </label>
                  </td>
                  <td>
                    <input
                      type={"text"}
                      min={10}
                      name="short_title"
                      placeholder="Short Title"
                      required
                      defaultValue={data.short_title}
                      onChange={handleChanges}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Title : </label>
                  </td>
                  <td>
                    <input
                      type={"text"}
                      min={30}
                      name="title"
                      placeholder="Title"
                      required
                      defaultValue={data.title}
                      onChange={handleChanges}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>More Details : </label>
                  </td>
                  <td>
                    <textarea
                      name="more_details"
                      minLength={200}
                      placeholder="More Details"
                      required
                      defaultValue={data.more_details}
                      onChange={handleChanges}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Quantity : </label>
                  </td>
                  <td>
                    <input
                      type={"number"}
                      min={5}
                      name="quantity"
                      placeholder="Quantity"
                      required
                      defaultValue={data.quantity}
                      onChange={handleChanges}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Category : </label>
                  </td>
                  <td>
                    <select
                      defaultValue={data.category}
                      name="category"
                      required
                      onChange={handleChanges}
                    >
                      <option value="">Select Category</option>
                      <option value="laptop">Laptop</option>
                      <option value="mobile">Mobile</option>
                      <option value="television">Television</option>
                      <option value="headphone">Headphone</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Price : </label>
                  </td>
                  <td>
                    <input
                      type={"number"}
                      name="price"
                      min={500}
                      placeholder="Price"
                      required
                      defaultValue={data.price}
                      onChange={handleChanges}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="save-cancel">
            <button onClick={handleSave}>Save</button>
            <button onClick={() => cancel(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )
  );
}

export default EditProduct;
