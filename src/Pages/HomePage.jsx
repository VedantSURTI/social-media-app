import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import React from "react";
import { MDBRow, MDBCol, MDBCardText } from "mdb-react-ui-kit";
import { MDBCard, MDBCardBody, MDBCardImage, MDBBtn } from "mdb-react-ui-kit";
import Posts from "./components/Posts";
import { handleFriendRequests } from "../reducers/notificationSlice";

function Main({ children }) {
  return <main>{children}</main>;
}

function findEle(email, state) {
  const temp = state.friends;
  if (typeof temp != "undefined") {
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === email) {
        return true;
      }
    }
  }
  return false;
}
function List({ users, from, state }) {
  return (
    <ul style={{ listStyle: "none" }}>
      {users?.map((user) => {
        if (!findEle(user.email, state)) {
          return <User user={user} key={user.email} from={from} />;
        } else return null;
      })}
    </ul>
  );
}
function User({ user, from }) {
  const dispatch = useDispatch();
  function handleFriendRequest(email, from) {
    const users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        users[i].friendRequests.push(from);
      }
    }
    dispatch(handleFriendRequests(email, from));
    localStorage.setItem("users", JSON.stringify(users));
  }
  return (
    <li key={user.email} style={{ marginTop: "10px" }}>
      <MDBCard className="users-card">
        <MDBRow>
          <MDBCol md="2">
            <MDBCardImage
              className="users-image"
              src={`data:image/png;base64,${user.image}`}
              position="top"
              alt="user image"
            />
          </MDBCol>
          <MDBCol md="10">
            <MDBCardBody>
              <MDBCardText className="users-name">
                {user.firstName} {user.lastName}
              </MDBCardText>
              <p className="users-emails">{user.email}</p>
              <MDBBtn
                size="sm"
                onClick={() => handleFriendRequest(user.email, from)}
              >
                Send Request
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </li>
  );
}

function Feed({ friends, posts }) {
  const authState = useSelector((state) => state.auth);
  let feed = [];
  if (typeof friends != "undefined") {
    for (let i = 0; i < friends.length; i++) {
      for (let j = 0; j < posts.length; j++) {
        if (friends[i] === posts[j].email) {
          feed.push(posts[j]);
        }
      }
    }
    for (let j = 0; j < posts.length; j++) {
      if (authState.email === posts[j].email) {
        feed.push(posts[j]);
      }
    }
    feed.sort((a, b) => a.date - b.date);
  }

  return <Posts feed={feed} />;
}

function HomePage() {
  const state = useSelector((state) => state.auth);
  const postState = useSelector((state) => state.post);
  const users = localStorage.getItem("users");
  const usersObj = JSON.parse(users);
  const user = usersObj.filter((user) => user.email !== state.email);

  //   console.log(user);
  return (
    <div>
      <Navbar state={state} />
      <Main>
        <MDBRow>
          <MDBCol md="3">
            <h3 style={{ paddingLeft: "90px" }}>Friend Requests</h3>
            <List users={user} from={state.email} state={state} />
          </MDBCol>
          <MDBCol md="9">
            <h3>Your Feed</h3>
            <Feed friends={state.friends} posts={postState} />
          </MDBCol>
        </MDBRow>
      </Main>
    </div>
  );
}

export default HomePage;
