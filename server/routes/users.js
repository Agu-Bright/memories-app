import express from "express";
const router = express.Router();
import { signUpUser, signInUser } from "../controllers/user.js";
import auth from "../middleware/authentication.js";

router.post("/signUp", signUpUser);
router.post("/signIn", signInUser);

export default router;
