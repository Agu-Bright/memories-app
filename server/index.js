import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import env from "dotenv";
import postRoutes from "./routes/post.js";
import userRoutes from "./routes/users.js";
import User from "./models/users.js";
env.config();
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

//routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

//const CONNECTION_URI ="mongodb+srv://memories:Xpretion12@cluster0.xvkpb.mongodb.net/Memories?retryWrites=true&w=majority";
// const CONNECTION_URI = "mongodb://localhost:27017";
const CONNECTION_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

const populate = async () => {
  try {
    mongoose
      .connect(CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() =>
        app.listen(PORT, () =>
          console.log(`Server Listening on port : ${PORT}`)
        )
      )
      .catch((error) => console.log(error.message));
  } catch (error) {
    console.log(error);
  }
};
populate();
