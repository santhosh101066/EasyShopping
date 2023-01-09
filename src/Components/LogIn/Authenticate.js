import React, { useEffect, useState } from "react";
import Login from "./Login";
import Brand from "./Brand";
import Signup from "./Signup";
import "../../CSS/Auth.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../Redux/Reducer/LoginBtn";

function Authenticate() {
  let [signup, setSignup] = useState(false);
  const dispatch = useDispatch()
  useEffect(()=>{
    function escEvent(e){
      if(e.key==='Escape'){
        dispatch(setLogin(false))
      };
    }
    document.addEventListener('keyup',escEvent)
    return ()=>{
      document.removeEventListener('keyup',escEvent)
    }
  })
  return (
    <div className="auth">
      <div className="login">
        <Brand />
        {signup ? (
          <Signup setSignup={setSignup} />
        ) : (
          <Login setSignup={setSignup} setLogin={setLogin} />
        )}
        <span className="close-auth" onClick={() =>dispatch(setLogin(false))}>
          X
        </span>
      </div>
    </div>
  );
}

export default Authenticate;
