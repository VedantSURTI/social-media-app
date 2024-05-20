import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem("notification")) || [];
const state = JSON.parse(localStorage.getItem("notifications"));
let initialState;
if (state === null) {
  initialState = [];
} else {
  initialState = state;
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    handleFriendRequests: {
      prepare(to, who) {
        return { payload: { to, who } };
      },
      reducer(state, action) {
        const temp = {
          to: action.payload.to,
          who: action.payload.who,
          message: "Follow request",
        };
        state.push(temp);
      },
    },
    handlePostNotification: {
      prepare(to, who) {
        return { payload: { to, who } };
      },
      reducer(state, action) {
        const temp = {
          to: action.payload.to,
          who: action.payload.who,
          message: "Post upload from",
        };
        state.push(temp);
      },
    },
    handleAcceptNotification: {
      prepare(to, who) {
        return { payload: { to, who } };
      },
      reducer(state, action) {
        const temp = {
          to: action.payload.to,
          who: action.payload.who,
          message: "Request accepted by ",
        };
        state.push(temp);
      },
    },
    deleteNotification: {
      reducer(state, action) {
        state = state.filter((item) => item.to !== action.payload);
        return state;
      },
    },
  },
});

export const {
  handleFriendRequests,
  handlePostNotification,
  handleAcceptNotification,
  deleteNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
