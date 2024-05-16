import * as React from "react";
// import React from "react";
// import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { setAuth, setImage } from "../../reducers/authSlice";
// import BasicModal from "./BasicModal";
function BasicModal({ state, open, setOpen }) {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [email, setEmail] = useState(state.email);
  const [newPass, setNewPass] = useState("");
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  function handleSubmit() {
    const users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        if (firstName !== "") users[i].firstName = firstName;
        if (lastName !== "") users[i].lastName = lastName;
        if (newPass !== "") users[i].password = newPass;
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
    dispatch(
      setAuth(
        email,
        firstName,
        lastName,
        state.friendRequests,
        state.friends,
        state.image,
        state.backgroundImage
      )
    );
    handleClose();
  }
  // const handleModalClick = (e) => {
  //   e.stopPropagation(); // Prevent event propagation to parent elements
  // };
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
  return (
    <div style={{ zIndex: 100000 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Friend Requests
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText> First Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></MDBInput>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {state.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Password</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBInput
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      type="password"
                    />
                  </MDBCol>
                  <MDBBtn style={{ marginTop: "20px" }} onClick={handleSubmit}>
                    Submit Change
                  </MDBBtn>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default function ChangeButtons({ handleImageUpload }) {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openDropdown = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
    handleClose();
    reader.readAsDataURL(file);
  }
  return (
    // <MDBDropdown>
    //   <MDBDropdownToggle>Dropdown</MDBDropdownToggle>
    //   <MDBDropdownMenu>
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={openDropdown ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openDropdown ? "true" : undefined}
        onClick={handleClick}
      >
        Settings
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openDropdown}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleClose}></MenuItem>
        <MenuItem>
          <p style={{ margin: "1rem", marginLeft: "0px" }}>
            Change profile picture:{" "}
          </p>
          <input
            type="file"
            name=""
            id="fileId"
            onChange={(e) => {
              imageUploaded(e);
            }}
          />
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Button
            style={{ color: "black", paddingLeft: "0px" }}
            onClick={() => setOpen(true)}
          >
            Edit your info
          </Button>
        </MenuItem>
      </Menu>
      <BasicModal setOpen={setOpen} open={open} state={state} />
    </>
    //   </MDBDropdownMenu>
    // </MDBDropdown>
  );
}

// export default function ChangeButtons() {
//   const dispatch = useDispatch();
//   const state = useSelector((state) => state.auth);
//   function imageUploaded(e) {
//     let base64String;
//     let file = e.target.files[0];
//     // console.log(file)
//     let reader = new FileReader();
//     // console.log("next");

//     reader.onload = function () {
//       base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
//       dispatch(setImage(base64String));
//     };
//     console.log(base64String);
//     reader.readAsDataURL(file);
//   }
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <MDBDropdown show={dropdownOpen} toggle={toggleDropdown}>
//       <MDBDropdownToggle onClick={toggleDropdown}>Dropdown</MDBDropdownToggle>
//       <MDBDropdownMenu>
//         <p>Change profile picture</p>
//         <input
//           type="file"
//           name=""
//           id="fileId"
//           onChange={(e) => {
//             imageUploaded(e);
//           }}
//         />
//         <BasicModal state={state}/>
//       </MDBDropdownMenu>
//     </MDBDropdown>
//   );
// }
