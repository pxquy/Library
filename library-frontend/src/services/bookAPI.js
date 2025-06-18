import axiosClient from "../utils/axiosClient";

export const getBooks = async () => {
  const res = await axiosClient.get("/books");
  return res.data;
};

export const getBookById = async (id) => {
  const res = await axiosClient.get(`/books/${id}`);
  return res.data;
};
