import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import useStyles from "./style.js";
import Filebase from "react-file-base64";
import { useGlobalContext } from "../../Context/appContext";

//GET THE CURRENT ID
const Form = () => {
  const classes = useStyles();
  const { createPost, updatePost, posts, User, currentId, setCurrentIDD } =
    useGlobalContext();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: [],
    selectedFile: "",
  });

  //find unique post
  const post = currentId ? posts.find((post) => (post._id = currentId)) : null;

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      updatePost(currentId, { ...postData, creator: User?.result?.name });
    } else {
      createPost({ ...postData, creator: User?.result?.name });
    }
    clear();
  };

  const clear = () => {
    setCurrentIDD(null);
    setPostData({
      title: "",
      message: "",
      tags: [],
      selectedFile: "",
    });
  };

  if (!User?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
          too
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      direction="column"
      spacing={2}
      className={classes.paper}
      elevation={6}
    >
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? `Editing` : `Creating`} A Memory
        </Typography>
        &nbsp;
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        &nbsp;
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          row={4}
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        &nbsp;
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <Filebase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          fullWidth
        >
          SUBMIT
        </Button>
        &nbsp;
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          CLEAR
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
