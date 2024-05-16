import { createSlice } from "@reduxjs/toolkit";

const state = JSON.parse(localStorage.getItem("auth"));
let initialState;
if (state === null) {
  initialState = {
    email: "",
    firstName: "",
    lastName: "",
    friendRequests: [],
    friends: [],
    image: "",
    backgroundImage: "",
  };
} else {
  initialState = state;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: {
      prepare(
        email,
        firstName,
        lastName,
        friendRequests,
        friends,
        image,
        backgroundImage
      ) {
        return {
          payload: {
            email,
            firstName,
            lastName,
            friendRequests,
            friends,
            image,
            backgroundImage,
          },
        };
      },
      reducer(state, action) {
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.friendRequests = action.payload.friendRequests;
        state.friends = action.payload.friends;
        state.image = action.payload.image;
        state.backgroundImage = action.payload.backgroundImage;
      },
    },
    resetName: {
      prepare(firstName, lastName) {
        return { payload: { firstName, lastName } };
      },
      reducer(state, action) {
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      },
    },
    sendRequest: {
      reducer(state, action) {
        state.friendRequest.push(action.payload);
      },
    },
    acceptRequest: {
      reducer(state, action) {
        state.friends.push(action.payload);
        state.friendRequests = state.friendRequests.filter(
          (email) => email !== action.payload
        );
      },
    },
    rejectRequest: {
      reducer(state, action) {
        state.friendRequests = state.friendRequests.filter(
          (email) => email !== action.payload
        );
      },
    },
    logOut: {
      reducer(state, action) {
        state.email = "";
        state.firstName = "";
        state.lastName = "";
        state.friendRequests = [];
        state.friends = [];
        state.image = "";
        state.backgroundImage = "";
      },
    },
    deleteFriend: {
      reducer(state, action) {
        state.friends = state.friends.filter((ele) => ele !== action.payload);
      },
    },
    setImage: {
      reducer(state, action) {
        state.image = action.payload;
      },
    },
    setBackgroundImage: {
      reducer(state, action) {
        state.backgroundImage = action.payload;
      },
    },
  },
});

export const {
  setAuth,
  resetName,
  sendRequest,
  acceptRequest,
  rejectRequest,
  logOut,
  deleteFriend,
  setImage,
  setBackgroundImage,
} = authSlice.actions;
export default authSlice.reducer;
