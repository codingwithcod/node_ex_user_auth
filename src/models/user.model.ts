import { Schema, Document, model } from "mongoose";

export interface IBaseUser {
  name: string;
  email: string;
  password: string;
  mobile: number;
  isVerified: boolean;
}

interface IUserSchema extends IBaseUser, Document {}

const userSchema = new Schema<IUserSchema>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userModel = model<IUserSchema>("user", userSchema);

export default userModel;
