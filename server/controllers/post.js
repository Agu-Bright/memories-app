import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

//CREATING_POST
export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

//FETCHING_POSTS
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: "SERVER ERROR" });
    console.log(error);
  }
};

//FETCHING_POSTS_BY_SEARCH
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });
    res.json({ ...posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//UPDATING_POSTS
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const update = req.body;

  //To ensure that the id is a mongoose objectId
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("There is no post with that Id found");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...update, _id },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPost);
};

//DELETING_POST
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  //To ensure that the id is a mongoose objectId
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("There is no post with that Id found");
  await PostMessage.findByIdAndRemove(_id);
  res.json({ msg: "deleted" });
};

//LIKING_POSTS
export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("There is no post with that Id found");
  }

  const post = await PostMessage.findById(_id);
  const index = post.likes.findIndex((id) => id === String(req.userId));
  if (index === -1) {
    //like the post
    post.likes.push(req.userId);
  } else {
    //dislike a post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const likePost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post },
    { new: true }
  );
  res.status(200).json(likePost);
};
