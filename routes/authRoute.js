import { Router } from "express";
import { SignUp, LogIn, LogOut } from "../controller/authController.js";

const AuthRouter = Router();

AuthRouter.post("/signup", SignUp);
AuthRouter.post("/login", LogIn);
AuthRouter.get("logout", LogOut);

export default AuthRouter;
