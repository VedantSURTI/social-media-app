// import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { acceptRequest, rejectRequest } from "../../reducers/authSlice";
import { MDBBtn } from "mdb-react-ui-kit";

function Item({ friendReq, state }) {
  const dispatch = useDispatch();
  function handleAccept(email) {
    dispatch(acceptRequest(email));
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
        <MDBBtn onClick={() => handleReject(friendReq)} color="danger">Decline</MDBBtn>
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
