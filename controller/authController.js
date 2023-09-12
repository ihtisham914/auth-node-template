import bcrypt from "bcryptjs";
import { UserModel } from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const SignUp = async (req, res) => {
  const { email, name, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  try {
    const verify = await UserModel.findOne({ email });

    // checking if the user already exists
    if (!verify) {
      const User = new UserModel({
        email: email,
        name: name,
        password: hash,
      });
      await User.save();
      res.status(200).json({
        status: 200,
        success: true,
        User,
      });
    } else {
      res.status(409).json({
        status: 409,
        success: false,
        message: "User already exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

export const LogIn = async (req, res) => {
  const user = req.body;

  try {
    console.log(user);
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: err,
    });
  }
};

export const LogOut = async (req, res) => {
  res.send("Logout route");
};
