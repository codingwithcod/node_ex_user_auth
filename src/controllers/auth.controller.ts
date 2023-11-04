import { RequestHandler } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, mobile } = req.body;
    const findUser = await userModel.findOne({ email });
    if (findUser)
      return res
        .status(403)
        .json({ success: false, message: "User already registered." });

    /** ---> hashing password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /** ---> first way */
    // await userModel.create({
    //   name,
    //   email,
    //   password,
    //   mobile,
    // });

    /** ---> second way */
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    next(error);
  }
};
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser)
      return res
        .status(404)
        .json({ success: false, message: "User not registered." });

    /** ---> comparing hashed password  */
    const isPasswordMatched = await bcrypt.compare(password, findUser.password);
    if (!isPasswordMatched)
      return res
        .status(401)
        .json({ success: false, message: "Password not matched." });

    /** ---> genereting jwt auth token */
    const token = jwt.sign(
      { name: findUser.name, id: findUser._id },
      JWT_SECRET!
    );

    res.status(200).json({
      success: true,
      message: "User logged successfully.",
      token,
    });
  } catch (error) {
    next(error);
  }
};
export const handleForgetPasswordEmail: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body;
    const findUser = await userModel.findOne({ email });
    if (!findUser)
      return res
        .status(404)
        .json({ success: false, message: "User not registered." });

    /** ---> genereting jwt auth token */
    const token = jwt.sign(
      { name: findUser.name, id: findUser._id },
      JWT_SECRET!,
      {
        expiresIn: 60,
      }
    );

    res.status(200).json({
      success: true,
      message: "Forget password email sent successfully.",
      token,
    });
  } catch (error) {
    next(error);
  }
};
export const handleForgetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const token = req.query.token as string;
    /** ---> verifing jwt auth token */
    if (!token)
      return res
        .status(403)
        .json({ success: false, message: "Token not found." });
    const userInfo = jwt.verify(token, JWT_SECRET!) as {
      name: string;
      id: string;
    };

    const findUser = await userModel.findById(userInfo.id);
    if (!findUser)
      return res
        .status(403)
        .json({ success: false, message: "User not registered." });

    /** ---> hashing password */
    const hashedPassword = await bcrypt.hash(password, 10);

    /** ---> method one */
    findUser.password = hashedPassword;
    findUser.save();

    /** ---> method second */
    // const updatedUser = await userModel.findByIdAndUpdate(findUser._id, {
    //   password: hashedPassword,
    // });

    res.status(200).json({
      success: true,
      message: "Forget password successfully.",
    });
  } catch (error) {
    next(error);
  }
};
