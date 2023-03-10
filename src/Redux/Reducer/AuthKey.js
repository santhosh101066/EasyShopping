import { createSlice } from "@reduxjs/toolkit";
import AxiosApi from "../../Api/AxiosApi";

export const authKey = createSlice({
  name: "Auth",
  initialState: {
    isLogin: false,
    isAdmin: false,
    name: "U",
    cartNo: 0, 
    initilize: localStorage.getItem("auth") ? true : false,
  },
  reducers: {
    setUserLogin(state) {
      state.isLogin = true;
    },
    removeUserLogin(state) {
      state.isLogin = false;
      localStorage.removeItem("auth");
      AxiosApi.defaults.headers.common["Authorization"] = null;
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setCartNumber(state, action) {
      state.cartNo = action.payload;
    },
    initialLoad(state) {
      state.initilize = false;
    },
  },
});

export const {
  setUserLogin,
  removeUserLogin,
  setAdmin,
  setName,
  setCartNumber,
  initialLoad,
} = authKey.actions;
