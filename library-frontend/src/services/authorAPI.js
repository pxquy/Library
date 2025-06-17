// src/services/authorAPI.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/authors";

export const getAllAuthors = async () => {
  try {
    const res = await axios.get(`${API_URL}`);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy danh sách tác giả:", err);
    return [];
  }
};
