import { createSlice } from "@reduxjs/toolkit";

export const loginBtn=createSlice({name:'LoginBtn',initialState:{openLogin:false},reducers:{
    setLogin(state,action){
        state.openLogin=action.payload
    }
    
}})
export const {setLogin} =loginBtn.actions
