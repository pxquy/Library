import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routers";
import { connectDB } from "./config/database";

dotenv.config();

connectDB();

const app = express();

// ✅ THÊM dòng này để cho phép truy cập từ frontend
app.use(cors({
  origin: "http://localhost:5173", // hoặc "*" nếu bạn muốn mở cho tất cả
  credentials: true
}));

app.use(express.json());

app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`✅ Kết nối thành công tới server ${process.env.PORT}`);
});
