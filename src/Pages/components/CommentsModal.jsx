import * as React from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBBtn,
  MDBCardText,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
// import * as React from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useState } from "react";
import { submitComment } from "../../reducers/postSlice";

function Item({ commentObj }) {
  return (
    <>
      <span>
        <li>
          {commentObj.firstName} {commentObj.lastName}
        </li>
        <MDBCardText>{commentObj.message}</MDBCardText>
      </span>
    </>
  );
}

function Comments({ id }) {
  const postState = useSelector((state) => state.post);
  let comments;
  for (let i = 0; i < postState.length; i++) {
    if (postState[i].id === id) {
      comments = postState[i].comments;
    }
  }
  let newComments = [];
  const users = JSON.parse(localStorage.getItem("users"));
  for (let i = 0; i < comments.length; i++) {
    const email = comments[i].email;
    for (let j = 0; j < users.length; j++) {
      if (users[j].email === email) {
        newComments.push({
          firstName: users[j].firstName,
          lastName: users[j].lastName,
          message: comments[i].message,
        });
      }
    }
  }
  comments = newComments;
  //   console.log(comments);
  return (
    <ul>
      {comments.map((commentObj) => (
        <Item commentObj={commentObj} />
      ))}
    </ul>
  );
}

export default function CommentsAccordion({ id }) {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  function handleCommentSubmit(comment) {
    dispatch(submitComment(id, authState.email, comment));
    setComment("");
  }
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>
            <MDBRow>
              <MDBCol>
                <MDBInput
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></MDBInput>
              </MDBCol>
              <MDBCol>
                <MDBBtn onClick={() => handleCommentSubmit(comment)}>
                  Commnet
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Comments id={id} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
