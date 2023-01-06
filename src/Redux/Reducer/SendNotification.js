import { createSlice } from "@reduxjs/toolkit";

export const sendNotification = createSlice({
  name: "Notification",
  initialState: { message: null },
  reducers: {
    send(state, action) {
      state.message = action.payload;
    },
    clear(state) {
      state.message = null;
    },
  },
});

export const notifyUser = sendNotification.actions.send;
export const clearNotification = sendNotification.actions.clear;
