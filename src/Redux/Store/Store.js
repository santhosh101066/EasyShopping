import { configureStore } from "@reduxjs/toolkit";
import { sendNotification } from "../Reducer/SendNotification";

export default  configureStore({reducer:{Notification:sendNotification.reducer}})