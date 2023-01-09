import { configureStore } from "@reduxjs/toolkit";
import { sendNotification } from "../Reducer/SendNotification";
import { authKey } from "../Reducer/AuthKey";
import { loginBtn } from "../Reducer/LoginBtn";

export default configureStore({
  reducer: { Notification: sendNotification.reducer, Authentication:authKey.reducer, loginBtn:loginBtn.reducer },
});
