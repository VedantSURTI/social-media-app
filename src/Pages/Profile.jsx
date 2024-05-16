import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import {
  acceptRequest,
  deleteFriend,
  rejectRequest,
  setBackgroundImage,
  setImage,
} from "../reducers/authSlice";
// import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import ChangeButtons from "./components/ChangeButtons";
import { setPost } from "../reducers/postSlice";
import { useState } from "react";
import PersonalFeedPost from "./components/PersonalFeedPost";

export default function ProfilePage() {
  const state = useSelector((state) => state.auth);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const users = JSON.parse(localStorage.getItem("users"));
  function handleDeleteFriend(email) {
    dispatch(deleteFriend(email));
  }

  function handleAccept(email) {
    dispatch(acceptRequest(email));
  }
  function handleReject(email) {
    dispatch(rejectRequest(email));
  }
  function imageUploaded(e) {
    let base64String;
    let file = e.target.files[0];
    // console.log(file)
    let reader = new FileReader();
    // console.log("next");

    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      dispatch(setImage(base64String));
    };
    const users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === state.email) {
        users[i].image = state.image;
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
    // console.log(base64String);
    reader.readAsDataURL(file);
  }
  function backgroundImageUpload(e) {
    let base64String;
    let file = e.target.files[0];
    // console.log(file)
    let reader = new FileReader();
    // console.log("next");

    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      dispatch(setBackgroundImage(base64String));
    };
    const users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === state.email) {
        users[i].backgroundImageimage = state.backgroundImageimage;
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
    // console.log(base64String);
    reader.readAsDataURL(file);
  }
  function handlePostUpload(e) {
    let base64String;
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = function () {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      dispatch(setPost(state.email, base64String, caption));
    };
    setCaption("");
    reader.readAsDataURL(file);
  }
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Navbar state={state} />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCard className="mb-4" style={{ padding: "0px" }}>
            <MDBCardBody
              className="text-center profile"
              style={{
                backgroundImage: `url(data:image/png;base64,${state.backgroundImage})`,
              }}
            >
              <input
                type="file"
                name=""
                id="fileId"
                onChange={(e) => backgroundImageUpload(e)}
                style={{ marginLeft: "1080px" }}
              />
              <MDBCardImage
                src={`data:image/png;base64,${state.image}`}
                alt="ptofile-image"
                className="rounded-circle"
                style={{ width: "150px", margin: "auto", display: "block" }}
                fluid
              />
              <ChangeButtons handleImageUpload={imageUploaded} />
              {/* <input
                  type="file"
                  name=""
                  id="fileId"
                  onChange={(e) => imageUploaded(e)}
                /> */}
              {/* <MDBBtn onClick={handleUpload}>Upload</MDBBtn> */}
            </MDBCardBody>
          </MDBCard>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    User Info
                  </span>{" "}
                </MDBCardText>
                <MDBCardText className="mt-4 mb-1">
                  Name: {state.firstName} {state.lastName}
                </MDBCardText>
                <MDBCardText className="mt-4 mb-1">
                  Email: {state.email}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Friends ({state.friends.length})
                  </span>{" "}
                </MDBCardText>
                {state.friends.map((ele) => {
                  let fName, lName;
                  for (let i = 0; i < users.length; i++) {
                    if (users[i].email === ele) {
                      fName = users[i].firstName;
                      lName = users[i].lastName;
                      break;
                    }
                  }
                  return (
                    <div key={ele}>
                      <MDBCardText className="mt-4 mb-1">
                        {fName} {lName}
                      </MDBCardText>
                      <MDBBtn
                        className="me-1"
                        color="danger"
                        onClick={() => handleDeleteFriend(ele)}
                      >
                        Delete Friend
                      </MDBBtn>
                    </div>
                  );
                })}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Friend Requests ({state.friendRequests.length})
                  </span>{" "}
                  {state.friendRequests.map((ele) => {
                    let fName, lName;
                    for (let i = 0; i < users.length; i++) {
                      if (users[i].email === ele) {
                        fName = users[i].firstName;
                        lName = users[i].lastName;
                        break;
                      }
                    }
                    return (
                      <div key={ele}>
                        <MDBCardText className="mt-4 mb-1">
                          {fName} {lName}
                        </MDBCardText>
                        <MDBBtn
                          className="me-1"
                          color="success"
                          onClick={() => handleAccept(ele)}
                        >
                          Accept
                        </MDBBtn>
                        <MDBBtn
                          className="me-1"
                          color="danger"
                          onClick={() => handleReject(ele)}
                        >
                          Reject
                        </MDBBtn>
                      </div>
                    );
                  })}
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBRow>
              <MDBCol ld="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Upload a post</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBInput
                          type="file"
                          onChange={(e) => handlePostUpload(e)}
                        ></MDBInput>
                        <MDBInput
                          type="text"
                          value={caption}
                          label="caption"
                          onChange={(e) => setCaption(e.target.value)}
                          style={{ marginTop: "10px" }}
                        ></MDBInput>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
                <MDBCardText> Your Posts</MDBCardText>
                <PersonalFeedPost />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
