import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
// import styles from "./Profile.module.css";
import { useState } from "react";
import { acceptRequest, deleteFriend, rejectRequest, setAuth } from "../reducers/authSlice";
// function Profile() {
//   const state = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const [firstName, setFirstName] = useState(state.firstName);
//   const [lastName, setLastName] = useState(state.lastName);
//   const [email, setEmial] = useState(state.email);
//   const [newPass, setNewPass] = useState("");

//   function handlleChange() {
//     const users = JSON.parse(localStorage.getItem('users'));
//     for(let i=0;i<users.length;i++){
//         if(users[i].email === email){

//         }
//     }
//     dispatch(
//       setAuth(email, firstName, lastName, state.friendRequests, state.friends)
//     );
//   }
//   return (
//     <>
//       <Navbar />
//       <main className={styles.profile_main}>
//         <div className={styles.user_view}>
//           <nav className={styles.user_view_menu}>
//             <ul className={styles.side_nav}>
//               <li>My Friends</li>
//               <li>Friend Requests</li>
//             </ul>
//           </nav>
//           <div className={styles.user_view__content}>
//             <div className={styles.user_view__form}>
//               <h2>Your Account Settings</h2>
//               <div className={styles.form}>
//                 <div className={styles.form__group}>
//                   <h4>First Name</h4>
//                   <input
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   ></input>
//                 </div>
//                 <div className={styles.form__group}>
//                   <h4>Last Name</h4>
//                   <input
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                   ></input>
//                 </div>
//                 <div className={styles.form__group}>
//                   <h4>Email</h4>
//                   <input value={email}></input>
//                 </div>
//                 <div className={styles.form__group}>
//                   <h4>Password</h4>
//                   <input
//                     value={newPass}
//                     onChange={(e) => setNewPass(e.target.value)}
//                   ></input>
//                 </div>
//               </div>
//               <button className="change" onClick={handlleChange}>
//                 <span>Submit</span>
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

// export default Profile;

import React from "react";
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

export default function ProfilePage() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(state.firstName);
  const [lastName, setLastName] = useState(state.lastName);
  const [email, setEmial] = useState(state.email);
  const [newPass, setNewPass] = useState("");
  const users = JSON.parse(localStorage.getItem("users"));
  function handleDeleteFriend(email) {
    dispatch(deleteFriend(email));
  }
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
      setAuth(email, firstName, lastName, state.friendRequests, state.friends)
    );
  }
  function handleAccept(email) {
    dispatch(acceptRequest(email));
  }
  function handleReject(email) {
    dispatch(rejectRequest(email));
  }
  return (
    <section style={{ backgroundColor: "#eee" }}>
      <Navbar />
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBCardText className="mb-4">
                  <span className="text-primary font-italic me-1">
                    Friend Requests
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

            <MDBRow>
              <MDBCol ld="8">
                <MDBCard className="mb-4 mb-md-0">
                  <MDBCardBody>
                    <MDBCardText className="mb-4">
                      <span className="text-primary font-italic me-1">
                        Friends
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
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
