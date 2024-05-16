import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../reducers/authSlice";
import { useEffect } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <div>We</div> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  console.log(authState);
  useEffect(() => {
    if (authState.email !== "") {
      alert("You are already logged in");
      navigate("/homepage");
    }
  }, [authState, navigate]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const users = localStorage.getItem("users");

    if (users) {
      const usersArray = JSON.parse(users);

      const user = usersArray.find(
        (u) => u.email === userData.email && u.password === userData.password
      );

      if (user) {
        const obj = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          friendRequests: user.friendRequests,
          friends: user.friends,
          image: user.image,
        };
        localStorage.setItem("auth", {});
        localStorage.setItem("auth", JSON.stringify(obj));
        dispatch(
          setAuth(
            user.email,
            user.firstName,
            user.lastName,
            user.friendRequests,
            user.friends,
            user.image
          )
        );
        alert(`Welcome ${user.firstName}`);
        navigate("/homepage");
      } else {
        alert(`The user doesn't exists. Please sign up`);
        navigate("/signup");
      }
    } else {
      alert(`The user doesn't exists. Please sign up`);
      navigate("/signup");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrNbmJCv9ysX3mfWJg7Nqfyv5XhS2N1MUbw6XAn5I0SpvNkwzlJoEVKRuTvQ&s)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
