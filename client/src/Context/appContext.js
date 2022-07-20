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
  setMountTrue,
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
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch, state.currentId, state.mount]);

  //populate user
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
  console.log(state.currentId);
  //USER_AUTHENTICATION
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
  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/posts");
      dispatch(getPost(data));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //Fetchpost by query string
  const fetchPostBySearch = async (searchQuery) => {
    try {
      const { data } = await axios.get(
        `/posts/search?searchQuery=${searchQuery.search || "none"}&tags=${
          searchQuery.tags || "none"
        }`
      );
      // dispatch(fetchPostBySearchSuccess(data));
      console.log(data);
      dispatch(setMountTrue());
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //create post
  const createPost = async (userInput) => {
    try {
      const { data } = await axios.post("/posts", userInput);
      dispatch(createPostSuccess(data.post));
      dispatch(setMountTrue());
    } catch (error) {
      dispatch(createPostError(error));
      console.log(error);
    }
  };

  //setCurrentId
  const setCurrentIDD = async (id) => {
    dispatch(setCurrentID(id));
  };

  //updatePost
  const updatePost = async (id, postUpdate) => {
    try {
      const { data } = await axios.patch(`/posts/${id}`, postUpdate);
      dispatch(updatePostSuccess(data));
      dispatch(setMountTrue());
    } catch (error) {
      dispatch(updatePostError(error));
    }
  };

  //deletePost
  const deletePost = async (id) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`);
      dispatch(deletePostSuccess(data, id));
      dispatch(setMountTrue());
    } catch (error) {
      dispatch(deletePostError(error));
    }
  };

  //likePost
  const likePost = async (id) => {
    try {
      const { data } = await axios.patch(`/posts/${id}/likePost`, id);
      dispatch(likePostSuccess(data));
      dispatch(setMountTrue());
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
