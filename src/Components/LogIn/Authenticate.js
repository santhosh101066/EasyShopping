import React, { useState } from "react";
import "../../CSS/Auth.css";
import Login from "./Login";
import Brand from "./Brand";
import Signup from "./Signup";
function Authenticate({setLogin}) {
    let [signup,setSignup]=useState(false)
  return (
    <div className="auth">
      <div className="login">
        <Brand />
        {signup?<Signup setSignup={setSignup}/>:<Login setSignup={setSignup}/>}
        <span className="close-auth" onClick={()=>setLogin(false)}>X</span>
      </div>
    </div>
  );
}

export default Authenticate;
