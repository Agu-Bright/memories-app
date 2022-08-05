import React from "react";
import useStyles from "./style.js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useGlobalContext } from "../../../Context/appContext.js";

const Post = ({ post }) => {
  const { deletePost, likePost, User, posts, setCurrentIDD } =
    useGlobalContext();
  const classes = useStyles();
  const navigate = useNavigate();
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find(
        (like) => like === (User?.result?.googleId || User?.result?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;
          {post.likes.length > 2 ? (
            <Typography variant="body2" component="h6">{`you and ${
              post.likes.length - 1
            } others`}</Typography>
          ) : (
            `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`
          )}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" /> &nbsp; {post.likes.length}{" "}
          {post.likes.length === 1 ? "like" : "likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined />
        &nbsp; like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <CardMedia
        onClick={openPost}
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />

      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      <div className={classes.overlay2}>
        {User?.result?.googleId === post?.creator ||
        User?.result?._id === post?.creator ? (
          <Button
            style={{ color: "white" }}
            size="small"
            onClick={() => setCurrentIDD(post._id, post)}
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag}`)}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" component="p">
        {post.title}
      </Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {post.message}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!User?.result}
          onClick={() => {
            likePost(post._id);
          }}
        >
          <Likes />
        </Button>

        {(User?.result?.googleId === post?.creator ||
          User?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              deletePost(post._id);
            }}
          >
            <DeleteIcon />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
