import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "2px",
    },
  },
  paper: {
    padding: "5px",
    marginTop: "5px",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  margin: {
    margin: "10px",
  },
}));
