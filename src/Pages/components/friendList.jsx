// import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { acceptRequest, rejectRequest } from "../../reducers/authSlice";
import { MDBBtn } from "mdb-react-ui-kit";
import { handleAcceptNotification } from "../../reducers/notificationSlice";

function Item({ friendReq, state }) {
  const dispatch = useDispatch();
  const users = JSON.parse(localStorage.getItem("users"));
  function handleAccept(email) {
    dispatch(acceptRequest(email));
    dispatch(handleAcceptNotification(email, state.email));
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        users[i].friends.push(state.email);
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
  function handleReject(email) {
    dispatch(rejectRequest(email));
  }
  return (
    <>
      <span>
        <li key={friendReq}>{friendReq}</li>
        <MDBBtn
          style={{ margin: "0px 10px" }}
          onClick={() => handleAccept(friendReq)}
          color="success"
        >
          Accept
        </MDBBtn>
        <MDBBtn onClick={() => handleReject(friendReq)} color="danger">
          Decline
        </MDBBtn>
      </span>
    </>
  );
}

function friendList({ state }) {
  const requests = state.friendRequests;
  //   console.log(state);
  return (
    <ul>
      {requests.map((friendReq) => (
        <Item friendReq={friendReq} state={state} />
      ))}
    </ul>
  );
}

export default friendList;
