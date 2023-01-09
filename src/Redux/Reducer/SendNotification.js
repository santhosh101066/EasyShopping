import { createSlice } from "@reduxjs/toolkit";

const initial={ message: null,color:'white' }

export const sendNotification = createSlice({
  name: "Notification",
  initialState: initial,
  reducers: {
    send(state, action) {
      state.color='white'
      state.message = action.payload;
    },
    error(state,action){
      state.message=action.payload;
      state.color='#e86056'
    },
    clear(state) {
      state={ message: null,color:'white' } ;
    },
  },
});

export const notifyUser = sendNotification.actions.send;
export const notifyUserError=sendNotification.actions.error;
export const clearNotification = sendNotification.actions.clear;
