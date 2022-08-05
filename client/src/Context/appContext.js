import React, { useContext, useReducer, useEffect } from "react";
import axios from "axios";
import "../axios";
import decode from "jwt-decode";
import reducer from "./reducer";
import {
  getPost,
  createPostSuccess,
  createPostError,
  updatePostSuccess,
  updatePostError,
  deletePostSuccess,
  deletePostError,
  likePostSuccess,
  likePostError,
  auth,
  removeUser,
  signUpUserSuccess,
  signUpUserError,
  fetchPostBySearchSuccess,
  setCurrentID,
  setMount,
  startLoading,
  endLoading,
  setPost,
} from "./action.js";

const AppContext = React.createContext();

export const initialState = {
  User: null,
  posts: [],
  errorMessage: "",
  successMessage: "",
  likeCount: 0,
  authData: {},
  currentId: "",
  mount: false,
  currentPage: "",
  numberOfPages: "",
  isLoading: false,
  post: null,
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const profile = localStorage.getItem("profile");

    if (profile) {
      const newUser = JSON.parse(profile);
      dispatch(signUpUserSuccess(newUser));
      const token = state.User?.token;
      if (token) {
        const decodedToken = decode(token);
        if (decodedToken.exp * 1000 < new Date().getTime().toIso()) logOut();
      }
    }
  }, []);

  //USER_AUTHENTICATION
  //signup
  const signUp = async (userInput, navigate) => {
    try {
      const { data } = await axios.post("/user/signUp", userInput);
      localStorage.setItem(
        "profile",
        JSON.stringify({ result: data.result, token: data.token })
      );
      dispatch(signUpUserSuccess(data));
      console.log(state.User);
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(signUpUserError(error));
    }
  };

  //signIn
  const signIn = async (formData, navigate) => {
    try {
      const { data } = await axios.post("/user/signIn", formData);
      if (data.message) {
        dispatch(signUpUserError(data.message));
        console.log(data.message);
        localStorage.clear();
      } else {
        localStorage.setItem(
          "profile",
          JSON.stringify({ result: data.result, token: data.token })
        );
        dispatch(signUpUserSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //fetch post
  const fetchPosts = async (page) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.get(`/posts?page=${page}`);
      dispatch(getPost(data));
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
    }
  };

  //get post
  const getSinglePost = async (id) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.get(`/posts/${id}`);
      dispatch(setPost(data));
      console.log(data);
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
    }
  };

  //Fetchpost by query string
  const fetchPostBySearch = async (searchQuery) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.get(
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
          searchQuery.tags || "none"
        }`
      );
      dispatch(fetchPostBySearchSuccess(data));
      dispatch(setMount());
      dispatch(endLoading());
    } catch (error) {
      console.log(error);
    }
  };

  //create post
  const createPost = async (userInput) => {
    try {
      dispatch(startLoading());
      const { data } = await axios.post("/posts", userInput);
      dispatch(createPostSuccess(data.post));
      dispatch(setMount());
      dispatch(endLoading());
    } catch (error) {
      dispatch(createPostError(error));
      console.log(error);
    }
  };

  //setCurrentId
  const setCurrentIDD = async (id, post) => {
    dispatch(setCurrentID(id));
    console.log(post);
  };

  //updatePost
  const updatePost = async (id, postUpdate) => {
    try {
      const { data } = await axios.patch(`/posts/${id}`, postUpdate);
      dispatch(updatePostSuccess(data));
      dispatch(setMount());
    } catch (error) {
      dispatch(updatePostError(error));
    }
  };

  //deletePost
  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`);
      dispatch(deletePostSuccess(data, id));
      dispatch(setMount());
    } catch (error) {
      dispatch(deletePostError(error));
    }
  };

  //likePost
  const likePost = async (id) => {
    try {
      const { data } = await axios.patch(`/posts/${id}/likePost`, id);
      dispatch(likePostSuccess(data));
      dispatch(setMount());
    } catch (error) {
      dispatch(likePostError(error));
    }
  };

  //Google Auth
  const googleAuth = (result, token) => {
    try {
      dispatch(auth(result, token));
    } catch (error) {
      dispatch(error);
    }
  };

  var logOut = (navigate) => {
    dispatch(removeUser());
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
        likePost,
        googleAuth,
        logOut,
        signUp,
        signIn,
        signUpUserSuccess,
        fetchPostBySearch,
        setCurrentIDD,
        getSinglePost,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
