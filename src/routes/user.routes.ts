import { Router } from "express";
import userModel from "../models/user.model";

const userRouter = Router();

userRouter.get("/", async (req, res) => {
  const users = await userModel.find();
  res.status(200).json({ success: true, users });
});

export default userRouter;
