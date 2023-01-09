import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLogin: localStorage.getItem("auth") ? true : false };
export const authKey = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUserLogin(state) {
      state.isLogin = true;
    },
    removeUserLogin(state) {
        state.isLogin=false
        localStorage.removeItem('auth')
    },
  },
});

export const {setUserLogin,removeUserLogin}=authKey.actions