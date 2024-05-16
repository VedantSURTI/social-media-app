import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = JSON.parse(localStorage.getItem("post")) || [];

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: {
      prepare(email, image, caption) {
        return { payload: { email, image, caption } };
      },
      reducer(state, action) {
        // console.log(action.payload.email);
        const temp = {
          id: uuidv4(),
          email: action.payload.email,
          image: action.payload.image,
          caption: action.payload.caption,
          like: 0,
          comments: {},
        };
        state.push(temp);
        return;
      },
    },
    deletePost: {
      reducer(state, action) {
        return state.filter((post) => post.id !== action.payload);
      },
    },
  },
});

export const { setPost, deletePost } = postSlice.actions;
export default postSlice.reducer;
