import React, { createRef, useCallback, useState } from "react";
import AxiosApi from "../../Api/AxiosApi";
import { useDispatch } from "react-redux";
import { notifyUser } from "../../Redux/Reducer/SendNotification";
import { setCartNumber } from "../../Redux/Reducer/AuthKey";

function AddressGetter({ p_id, quantity, cancel, list, reload }) {
  const [address, setAddress] = useState("");
  const textarea = createRef();
  const dispatch = useDispatch();
  const handleInput = useCallback(
    (e) => {
      e.preventDefault();
      if (address.length > 40) {
        if (list) {
          AxiosApi.post("orders", { list,address })
            .then(() => {
              cancel(true);
              dispatch(notifyUser("Your Orders Have been Placed"));
              reload()
              AxiosApi.get("cartcount").then((res) => {
                dispatch(setCartNumber(res.data.length));
              });
            })
            .catch(console.log);
        } else {
          AxiosApi.post("singleorder", {
            p_id: p_id,
            quantity: quantity,
            address: address,
          }).then((res) => {
            cancel(false);
            dispatch(notifyUser("Your Order Have been Placed"));
            AxiosApi.get("cartcount").then((res) => {
              dispatch(setCartNumber(res.data.length));
            });
          });
        }
      } else {
        textarea.current.setCustomValidity("Minimum 40 characters required");
      }
    },
    [address, cancel, dispatch, list, p_id, quantity, reload, textarea]
  );
  function handleChanges(e) {
    textarea.current.setCustomValidity("");
    setAddress(e.target.value);
  }

  return (
    <div className="auth">
      <div className="login">
        <h1>Delivery Address</h1>
        <div className="address">
          <form onSubmit={handleInput}>
            <textarea ref={textarea} name="address" onChange={handleChanges} />
            <div className="address-controls">
              <button type="submit">Confirm to order</button>
              <button
                onClick={() => {
                  cancel(false);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddressGetter;
