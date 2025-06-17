import express from "express";
import dotenv from "dotenv";
import router from "./routers";
import { connectDB } from "./config/database";

dotenv.config();

connectDB();

const add = express();

add.use(express.json());

add.use("/api", router);

add.listen(process.env.PORT, () => {
  console.log(`Kết nối thành công tới sever ${process.env.PORT}`);
});
