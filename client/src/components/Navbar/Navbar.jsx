import React, { useState, useEffect } from "react";
import {
  AppBar,
  Avatar,
  Button,
  Stack,
  Toolbar,
  Typography,
  Box,
  Card,
} from "@mui/material";
import decode from "jwt-decode";
import useStyles from "./styles.js";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../Context/appContext";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const { logOut, User, signUpUserSuccess } = useGlobalContext();
  const classes = useStyles();
  const navigate = useNavigate();
  const Location = useLocation();
  const logOutUser = () => {
    logOut();
    navigate("/");
  };

  return (
    <Card
      elevation={6}
      direction="row"
      color="secondary "
      className={classes.appBar}
      position="static"
      raised
    >
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h4"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src="https://i.ibb.co/NyJqJWK/memories-Logo.png"
          alt="logo"
          height="60"
        />
      </div>

      <Toolbar className={classes.toolbar}>
        {User ? (
          <div className={classes.profile}>
            {/* <Avatar className={classes.purple} alt={user.result.name}>
              <Typography className={classes.userName} variant="h6">
                {user.result.name}
              </Typography>
              <Button
                variant="contained"
                className={classes.logout}
                color="secondary"
                onClick={logOutUser}
              >
                Signout
              </Button>
            </Avatar> */}
            <Stack spacing={2} direction="row" align="center" justify="center">
              <Typography>{User.result.name}</Typography>
              <Typography></Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={logOutUser}
              >
                signOut
              </Button>
            </Stack>
          </div>
        ) : (
          <Button component={Link} to="/auth" color="primary">
            Signin
          </Button>
        )}
      </Toolbar>
    </Card>
  );
}

export default Navbar;
