import {
  Avatar,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import { Container } from "@mui/system";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import React, { useState } from "react";
import useStyles from "./style.js";
import Input from "./input";
import GoogleIcon from "@mui/icons-material/Google";

//google login
import { useGlobalContext } from "../Context/appContext";
import { useNavigate } from "react-router-dom";
const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function Auth() {
  const classes = useStyles();
  const { googleAuth, signUp, signIn } = useGlobalContext();
  //   const state = null;

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      //logic to sign up the user
      signUp(formData, navigate);
    } else {
      //logic to signin the user
      signIn(formData, navigate);
    }
  };

  // const googleSuccess = async (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;
  //   googleAuth(result, token);
  //   console.log(res);
  // };
  // const googleFailure = async (error) => {
  //   console.log(error);
  //   console.log("Google Sign In was unsuccessful");
  // };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Stack container spacing={2}>
            {isSignUp ? (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  value={formData.firstName}
                  autoFocus
                  half
                />

                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  value={formData.lastName}
                  autoFocus
                  half
                />
              </>
            ) : null}

            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              value={formData.email}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              value={formData.password}
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />

            {isSignUp ? (
              <>
                <Input
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              </>
            ) : null}
          </Stack>
          {/* <GoogleLogin
            clientId="351861005954-9miu8co8otiue6bos6js44ofj8qo2ca0.apps.googleusercontent.com"
            render={(renderProps) => (
              <Stack spacing={2} align="center" className={classes.spacing}>
                <Button
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<GoogleIcon />}
                  variant="contained"
                >
                  Google SignIn
                </Button>
              </Stack>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Stack spacing={2} align="center" className={classes.spacing}>
            <Button type="sumbit" variant="contained" fullWidth color="primary">
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
          </Stack>

          <Stack spacing={2} align="center" className={classes.spacing}>
            <Button onClick={switchMode}>
              {isSignUp
                ? "Already have an account? Sign In"
                : "Dont have an account? sign Up"}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
