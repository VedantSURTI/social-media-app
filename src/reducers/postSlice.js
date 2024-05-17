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
          comments: [],
          date: new Date().toISOString(),
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
    likePost: {
      reducer(state, action) {
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.payload) {
            state[i].like += 1;
          }
        }
      },
    },
    submitComment: {
      prepare(id, email, message) {
        return { payload: { id, email, message } };
      },
      reducer(state, action) {
        for (let i = 0; i < state.length; i++) {
          if (state[i].id === action.payload.id) {
            state[i].comments.push({
              email: action.payload.email,
              message: action.payload.message,
            });
          }
        }
      },
    },
  },
});

export const { setPost, deletePost, likePost, submitComment } = postSlice.actions;
export default postSlice.reducer;
