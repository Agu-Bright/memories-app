import mongoose from "mongoose";
import env from "dotenv";
import User from "./models/users.js";
env.config();
const start = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.deleteMany();
    console.log("Success");
  } catch (error) {
    console.log(error);
  }
};
start();
