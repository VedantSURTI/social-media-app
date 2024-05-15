import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import { useState } from "react";

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function findEle(email, state) {
  const temp = state.friends;
  for (let i = 0; i < temp.length; i++) {
    if (temp[i] === email) {
      return true;
    }
  }
  return false;
}
function List({ users, from, state }) {
  return (
    <ul className="list list-item">
      {users?.map((user) => {
        if (!findEle(user.email, state)) {
          return <User user={user} key={user.email} from={from} />;
        } else return null;
      })}
    </ul>
  );
}
function User({ user, from }) {
  // const dispatch = useDispatch();
  function handleFriendRequest(email, from) {
    const users = JSON.parse(localStorage.getItem("users"));
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        users[i].friendRequests.push(from);
      }
    }
    localStorage.setItem("users", JSON.stringify(users));
  }
  return (
    <li key={user.email}>
      {/* <img src={user.Poster} alt={`${user.Title} poster`} /> */}
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <div style={{ display: "flex" }}>
        <p
          style={{
            display: "inline-block",
            marginTop: "1rem",
            marginBottom: "1rem",
            marginRight: "1rem",
          }}
        >
          {user.email}
        </p>
        <button
          className="request"
          alt="SEND REQUEST"
          onClick={() => handleFriendRequest(user.email, from)}
        >
          <i>S</i>
          <i>E</i>
          <i>N</i>
          <i>D</i>
          <i>&nbsp;</i>
          <i>R</i>
          <i>E</i>
          <i>Q</i>
          <i>U</i>
          <i>E</i>
          <i>S</i>
          <i>T</i>
        </button>
      </div>
    </li>
  );
}

function HomePage() {
  const state = useSelector((state) => state.auth);
  const users = localStorage.getItem("users");
  const usersObj = JSON.parse(users);
  const user = usersObj.filter((user) => user.email !== state.email);

  //   console.log(user);
  return (
    <div>
      <Navbar state={state} />
      <Main>
        <Box>
          <List users={user} from={state.email} state={state} />
        </Box>
        <Box></Box>
      </Main>
    </div>
  );
}

export default HomePage;
