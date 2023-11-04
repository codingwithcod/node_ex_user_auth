import mongoose from "mongoose";

const connectDb = async (url: string) => {
  try {
    await mongoose.connect(url);
    console.log("Database connected ....");
  } catch (error) {
    console.log("Database not connected !!");
    console.log(error);
  }
};

export default connectDb;
