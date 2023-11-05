import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

const validator = function (schema: AnyZodObject) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      console.log("zod error : ---< >", error);

      if (error instanceof ZodError) {
        return res
          .status(422)
          .json({ success: false, message: error.errors[0].message });
      }
      next(error);
    }
  };
};

export default validator;
