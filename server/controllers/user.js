import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";

export const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "please Provide your full details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "The user already exists" });
    }

    //confirm password
    if (password !== confirmPassword) {
      return res.json({ message: "password dont match" });
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //create user
    const fullName = `${firstName} ${lastName}`;
    const result = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
    });

    //create token
    const token = await jwt.sign(
      { email: result.email, id: result._id },
      "Bright",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//sign in user
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ message: "please Provide your full details" });
  }
  const result = await User.findOne({ email });
  if (!result) {
    return res.json({ message: "User not found" });
  }
  //compare Password
  const isMatch = await bcrypt.compare(password, result.password);
  if (!isMatch) {
    return res.json({ message: "invalid Credentials" });
  }
  const token = jwt.sign({ email: result.email, id: result._id }, "Bright", {
    expiresIn: "1h",
  });
  // res.status(200).json({ existingUser, token });
  res.json({ result, token });
};
