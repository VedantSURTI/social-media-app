import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import postReducer from "./reducers/postSlice";
import notificationReducer from "./reducers/notificationSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    notification: notificationReducer,
  },
});

export default store;
