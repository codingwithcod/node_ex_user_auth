import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const HOST_NAME = process.env.HOST_NAME;
export const JWT_SECRET = process.env.JWT_SECRET;
