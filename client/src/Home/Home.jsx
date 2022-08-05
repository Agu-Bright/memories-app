import React, { useState, useEffect, useReducer } from "react";
import {
  Container,
  AppBar,
  Grow,
  Grid,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useHistory } from "react-router-dom";
// import ChipInput from "material-ui-chip-input";
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import { useGlobalContext } from "../Context/appContext";
import useStyles from "./style.js";
import Paginate from "../components/pagination";
import reducer from "../Context/reducer";
import { initialState } from "../Context/appContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetchPosts, likePost, posts, fetchPostBySearch, currentId } =
    useGlobalContext();

  const classes = useStyles();
  // const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();
  //search states
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  //handling the search query
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //search post
      searchPosts();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);

  const handleDelete = (tagtoDelete) => {
    setTags(tags.filter((tag) => tag !== tagtoDelete));
  };

  const searchPosts = () => {
    if (search.trim() || tags) {
      //logic to fetch searched post

      dispatch(fetchPostBySearch({ search, tags: tags.join(",") }));

      navigate(
        `/posts/search?searchQuery=${search || "none"}&tags=${
          tags.join(".") || "none"
        }`
      );
    } else {
      navigate("/");
    }
  };
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.griddContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {/* <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              /> */}
              <Button
                onClick={searchPosts}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
