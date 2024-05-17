import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../reducers/postSlice";

function LikeButton({ postId }) {
  const dispatch = useDispatch();
  function handleLike(id) {
    dispatch(likePost(id));
  }

  return (
    <div class="heart-container" title="Like">
      <input
        type="checkbox"
        class="checkbox"
        id="Give-It-An-Id"
        onClick={() => handleLike(postId)}
      />
      <div class="svg-container">
        <svg
          viewBox="0 0 24 24"
          class="svg-outline"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
        </svg>
        <svg
          viewBox="0 0 24 24"
          class="svg-filled"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
        </svg>
        <svg
          class="svg-celebrate"
          width="100"
          height="100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="10,10 20,20"></polygon>
          <polygon points="10,50 20,50"></polygon>
          <polygon points="20,80 30,70"></polygon>
          <polygon points="90,10 80,20"></polygon>
          <polygon points="90,50 80,50"></polygon>
          <polygon points="80,80 70,70"></polygon>
        </svg>
      </div>
    </div>
  );
}

export default function Posts({ feed }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);
  const users = JSON.parse(localStorage.getItem("users"));
  let temp = [];
  for (let i = 0; i < feed.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (feed[i].email === users[j].email) {
        const fullName = {
          image: users[j].image,
          fname: users[j].firstName,
          lname: users[j].lastName,
        };
        temp.push(fullName);
      }
    }
  }
  return (
    <div style={{ marginLeft: "250px" }}>
      {feed.map((postObj, i) => {
        return (
          <MDBCard className="feed-cards">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="2">
                  <MDBCardImage
                    className="users-image"
                    src={`data:image/png;base64,${temp[i].image}`}
                  ></MDBCardImage>
                </MDBCol>
                <MDBCol md="10" className="feed-names">
                  <MDBCardTitle>
                    {temp[i].fname} {temp[i].lname}
                  </MDBCardTitle>
                </MDBCol>
              </MDBRow>
              <MDBCardText className="feed-caption">Caption: {postObj.caption}</MDBCardText>
            </MDBCardBody>
            <MDBCardImage
              src={`data:image/png;base64,${postObj.image}`}
              position="top"
              alt="..."
            />
            <MDBCardBody>
              <MDBCardText>Likes : {postObj.like}</MDBCardText>
              <LikeButton postId={postObj.id}></LikeButton>
            </MDBCardBody>
          </MDBCard>
        );
      })}
    </div>
  );
}
