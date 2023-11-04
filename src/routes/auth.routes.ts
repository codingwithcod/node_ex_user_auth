import { Router } from "express";
import {
  handleForgetPassword,
  handleForgetPasswordEmail,
  login,
  signup,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/forget-password-email", handleForgetPasswordEmail);
authRouter.post("/forget-password", handleForgetPassword);

export default authRouter;
