import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
        // console.log("Hit", j);
        // comments[i].firstName = users[j].firstName;
        // comments[i].lastName = users[j].lastName;
        newComments.push({
          firstName: users[j].firstName,
          lastName: users[j].lastName,
          message: comments[i].message,
        });
        // console.log(newComments);
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
