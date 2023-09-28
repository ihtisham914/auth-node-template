import bcrypt from "bcryptjs";
import { UserModel } from "../model/userModel.js";
import dotenv from "dotenv";
import AppError from "../utils/appError.js";
import Jwt from "jsonwebtoken";

dotenv.config();

const signToken = (user) => {
  return Jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.SECRET_JWT_KEY
  );
};

export const SignUp = async (req, res, next) => {
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
      next(new AppError("User already exists", 409));
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

export const LogIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // if the email and password exists
    if (!email || !password) {
      next(new AppError("Please provide email and password"));
    }

    // if user exists and password is correct
    const user = await UserModel.findOne({ email });
    const correct = await bcrypt.compare(password, user.password);

    if (!user || !correct) {
      next(new AppError("Incorrect email or password", 401));
    }
    // if everything is okey, send token to the client
    const token = signToken(user);

    res.status(200).json({
      status: 200,
      success: true,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: error,
    });
  }
};

export const LogOut = async (req, res) => {
  res.send("Logout route");
};
