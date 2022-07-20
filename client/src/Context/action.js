//action Creators
export const getPost = (data) => {
  return {
    type: "FETCH_ALL",
    payload: data,
  };
};

export const fetchPostBySearchSuccess = (data) => {
  return {
    type: "FETCH_POSTS_BY_SEARCH",
    payload: data,
  };
};

export const createPostSuccess = (post) => {
  return {
    type: "CREATE_POST-SUCCESS",
    payload: post,
  };
};

export const createPostError = (err) => {
  return {
    type: "CREATE_POST-ERROR",
    payload: err,
  };
};

export const updatePostSuccess = (update) => {
  return {
    type: "UPDATE_POST_SUCCESS",
    payload: update,
  };
};

export const updatePostError = (error) => {
  return {
    type: "UPDATE_POST_SUCCESS",
    payload: error,
  };
};

export const deletePostSuccess = (message, id) => {
  return {
    type: "DELETE_POST_SUCCESS",
    payload: message,
    id: id,
  };
};

export const deletePostError = (error) => {
  return {
    type: "DELETE_POST_ERROR",
    payload: error,
  };
};

export const likePostSuccess = (update) => {
  return {
    type: "LIKE_POST_SUCCESS",
    payload: update,
  };
};

export const likePostError = (error) => {
  return {
    type: "LIKE_POST_ERROR",
    payload: error,
  };
};

//AUTH ACTIONS

//-- googleAuth
export const auth = (result, token) => {
  return {
    type: "AUTH",
    payload: { result, token },
  };
};

export const removeUser = () => {
  return {
    type: "REMOVE_USER",
  };
};

//-- custom Auth
export const signUpUserSuccess = (data) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    payload: data,
  };
};

export const signUpUserError = (data) => {
  return {
    type: "SIGNIN_USER_ERROR",
    payload: data,
  };
};
export const setUser = (data) => {
  return {
    type: "SET_USER",
    payload: data,
  };
};

export const setCurrentID = (id) => {
  return {
    type: "SET_CURRENT_ID",
    payload: id,
  };
};

export const setMountTrue = () => {
  return {
    type: "SET_MOUNT_TRUE",
  };
};
