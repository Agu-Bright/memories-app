import React, { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@mui/material";
import useStyles from "./styles";
import { useGlobalContext } from "../Context/appContext";
import reducer from "../Context/reducer";

const Paginate = ({ page }) => {
  const [state, dispatch] = useReducer(reducer, useGlobalContext);
  const classes = useStyles();
  const { fetchPosts, currentId, mount, numberOfPages } = useGlobalContext();

  useEffect(() => {
    if (page) {
      dispatch(fetchPosts(page));
    }
  }, [dispatch, page, currentId, mount]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
    />
  );
};

export default Paginate;
