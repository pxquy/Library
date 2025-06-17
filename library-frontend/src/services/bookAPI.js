import axios from "axios";

const API = "http://localhost:3000/api/books"; // điều chỉnh lại nếu cần

export const getBooks = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getBookById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};
