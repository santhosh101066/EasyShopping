import { createSlice } from "@reduxjs/toolkit";
import AxiosApi from "../../Api/AxiosApi";

const initialState = { isLogin: false };
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
        AxiosApi.defaults.headers.common["Authorization"]=null;
    },
  },
});

export const {setUserLogin,removeUserLogin}=authKey.actions