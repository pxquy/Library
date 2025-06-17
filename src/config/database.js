import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Kết nối database thành công");
  } catch (error) {
    console.log("kết nối thất bại!", error.message);
  }
};
