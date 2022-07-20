import React from "react";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Home/Home";
import PostDetails from "./components/postDetails/PostDetails";
import { useGlobalContext } from "./Context/appContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "./Auth/Auth";
function App() {
  const { User } = useGlobalContext();
  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={User ? <Navigate to="/" /> : <Auth />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
