import express from "express";
import {
  getPosts,
  getPostsBySearch,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/post.js";
import auth from "../middleware/authentication.js";
const router = express.Router();

router.get("/", getPosts);
router.get("/search", getPostsBySearch);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost); //add logic for updateing only the post that you created
router.delete("/:id", auth, deletePost); //add logic for deleting only the post that you created
router.patch("/:id/likePost", auth, likePost);

export default router;
