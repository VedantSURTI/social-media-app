import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { MDBBtn } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotification } from "../../reducers/notificationSlice";
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

function Item({ notificationObj }) {
  return (
    <li key={new Date().toISOString()}>
      {notificationObj} from {notificationObj.firstName}{" "}
      {notificationObj.lastName}
    </li>
  );
}

function NotificaitonList() {
  const authState = useSelector((state) => state.auth);
  const notificationState = useSelector((state) => state.notification);

  // Filter notifications for the authenticated user
  const not = notificationState.filter(
    (notification) => notification.to === authState.email
  );

  // Retrieve users from localStorage
  const users = JSON.parse(localStorage.getItem("users"));

  // Construct the notifications array with user details
  const notifications = not.map((notification) => {
    const user = users.find((user) => user.email === notification.to);
    return {
      firstName: user?.firstName || "Unknown",
      lastName: user?.lastName || "User",
      message: notification.message,
    };
  });

  return (
    <ul>
      {notifications.map((notificationObj, index) => (
        <li key={index}>
          {notificationObj.message} from {notificationObj.firstName}{" "}
          {notificationObj.lastName}
        </li>
      ))}
    </ul>
  );
}

export default function NotificationsModal({ state }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  return (
    <div>
      <Button style={{ color: "white" }} onClick={handleOpen}>
        Notifications
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Notifications
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <NotificaitonList />
            <MDBBtn
              color="danger"
              onClick={() => dispatch(deleteNotification(authState.email))}
            >
              Clear all
            </MDBBtn>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
