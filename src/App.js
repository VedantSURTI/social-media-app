import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Profile from "./Pages/Profile";
import { useSelector } from "react-redux";
import { useEffect } from "react";
function App() {
  const postState = useSelector((state) => state.post);
  const notificationState = useSelector((state) => state.notification);
  useEffect(
    function () {
      localStorage.setItem("post", JSON.stringify(postState));
    },
    [postState]
  );
  useEffect(
    function () {
      localStorage.setItem("notifications", JSON.stringify(notificationState));
    },
    [notificationState]
  );
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
