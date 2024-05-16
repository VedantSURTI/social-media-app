import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import postReducer from "./reducers/postSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
  },
});

export default store;
