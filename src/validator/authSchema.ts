import { object, string, number } from "zod";

export const signupInputSchema = object({
  body: object({
    name: string({ required_error: "name is required !" }).min(3, {
      message: "name must be 3 characters long !",
    }),
    email: string({ required_error: "email is required !" }).email({
      message: "invalid email address !",
    }),
    password: string({ required_error: "password is required !" }).min(8, {
      message: "password must be 8 characters long !",
    }),
    mobile: number({ required_error: "mobile no. is required !" }),
  }),
});

export const loginInputSchema = object({
  body: object({
    email: string({ required_error: "email is required !" }).email({
      message: "invalid email address",
    }),
    password: string({ required_error: "password is required !" }).min(8, {
      message: "password must be 8 characters long !",
    }),
  }),
});
export const forgetPasswordEmailInputSchema = object({
  body: object({
    email: string({ required_error: "email is required !" }).email({
      message: "invalid email address !",
    }),
  }),
});
export const forgetPasswordInputSchema = object({
  body: object({
    password: string({ required_error: "password is required !" }).min(8, {
      message: "password must be 8 characters long !",
    }),
  }),
  query: object({
    token: string({
      required_error: "token is required for forget password !",
    }),
  }),
});
