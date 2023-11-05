import { Router } from "express";
import {
  handleForgetPassword,
  handleForgetPasswordEmail,
  login,
  signup,
} from "../controllers/auth.controller";
import validator from "../validator";
import {
  forgetPasswordEmailInputSchema,
  forgetPasswordInputSchema,
  loginInputSchema,
  signupInputSchema,
} from "../validator/authSchema";

const authRouter = Router();

authRouter.post("/signup", validator(signupInputSchema), signup);
authRouter.post("/login", validator(loginInputSchema), login);
authRouter.post(
  "/forget-password-email",
  validator(forgetPasswordEmailInputSchema),
  handleForgetPasswordEmail
);
authRouter.post(
  "/forget-password",
  validator(forgetPasswordInputSchema),
  handleForgetPassword
);

export default authRouter;
