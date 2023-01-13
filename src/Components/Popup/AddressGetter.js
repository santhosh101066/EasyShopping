import React, { createRef, useCallback, useState } from "react";

function AddressGetter({ p_id, quantity, cancel }) {
  const [invalid,setInvalid]=useState(false)
  const [address,setAddress]=useState('')
  const textarea=createRef()
  const handleInput=useCallback(()=>{
    console.log("a");
    if(address.length>40){
      
    }
    else{
      textarea.current.setCustomValidity("Minimum 40 characters required")
    }
  },[address,textarea])
  function handleChanges(e){
    setAddress(e.target.value)
  }

  return (
    <div className="auth">
      <div className="login">
        <h1>Delivery Address</h1>
        <div className="address">
          <form onSubmit={(e)=>e.preventDefault()}>
          <textarea ref={textarea} name="address"  onChange={handleChanges}  />
          <div className="address-controls">
            <button onClick={handleInput}>Confirm to order</button>
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
