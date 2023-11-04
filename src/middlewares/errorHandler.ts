import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  try {
    console.log("ERROR : --->", err);
    // .... loging error here

    res.status(500).json({ success: false, message: "Internal sever error" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal sever error" });
  }
};

export default errorHandler;
