import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

axios.interceptors.request.use(function (req) {
  const user = localStorage.getItem("profile");
  if (user) {
    const { token } = JSON.parse(localStorage.getItem("profile"));
    req.headers.Authorization = `Bearer ${token}`;
    return req;
  }
  return req;
});
