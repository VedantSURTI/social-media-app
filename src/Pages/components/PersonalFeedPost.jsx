import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../../reducers/postSlice";

export default function PersonalFeedPost() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);
  function handleDeltePost(id) {
    dispatch(deletePost(id));
  }
  return (
    <div>
      {postState.map((postObj, i) => {
        if (postObj.email === authState.email) {
          return (
            <MDBCard>
              <MDBCardImage
                src={`data:image/png;base64,${postObj.image}`}
                position="top"
                alt="..."
              />
              <MDBCardBody>
                <MDBCardTitle>{postObj.caption}</MDBCardTitle>
                <MDBCardText>Likes : {postObj.like}</MDBCardText>
                <MDBBtn
                  color="danger"
                  onClick={() => handleDeltePost(postObj.id)}
                >
                  Delete
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          );
        }
      })}
    </div>
  );
}
