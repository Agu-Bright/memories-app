import React from "react";
import Post from "./Post/Post";
import useStyles from "./style.js";
import { useGlobalContext } from "../../Context/appContext";
import { Grid, CircularProgress } from "@mui/material";

const Posts = ({ setCurrentId }) => {
  const { posts } = useGlobalContext();

  return !posts.length ? (
    <CircularProgress />
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid item key={post._Id} xm={12} sm={6}>
          <Post key={post._id} post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
