const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MOUNT_TRUE":
      return {
        ...state,
        mount: true,
      };
    case "FETCH_ALL":
      return {
        ...state,
        posts: action.payload,
      };
    case "FETCH_POSTS_BY_SEARCH":
      return {
        ...state,
        posts: action.payload,
      };
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };
    case "CREATE_POST_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "UPDATE_POST_SUCCESS":
      return {
        ...state,
        ...state.posts.map((post) =>
          post._id === action.id ? action.payload : post
        ),
      };
    case "UPDATE_POST_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "DELETE_POST_SUCCESS":
      return {
        ...state,
        ...state.posts.filter((post) => post._id !== action.id),
        successMessage: action.payload,
      };
    case "DELETE_POST_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "LIKE_POST_SUCCESS":
      return {
        ...state,
        ...state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "LIKE_POST_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };
    case "AUTH":
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      return {
        ...state,
        authData: { ...action.payload },
      };
    case "REMOVE_USER":
      localStorage.clear();
      return {
        ...state,
        authData: null,
        User: null,
      };
    case "SIGNUP_USER_SUCCESS":
      return {
        ...state,
        User: action.payload,
      };
    case "SIGNIN_USER_ERROR":
      return {
        ...state,
        user: null,
        errorMessage: action.payload,
      };
    case "SET_USER":
      return {
        ...state,
        User: action.payload,
      };
    case "SET_CURRENT_ID":
      return {
        ...state,
        currentId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
