import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    name: "",
    price: "",
    description: "",
    date: "",
    author: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [bookRes, authorRes, categoryRes] = await Promise.all([
        axiosClient.get(`/books/${id}`),
        axiosClient.get("/author"),
        axiosClient.get("/categories"),
      ]);

      const bookData = bookRes.data.getBook; // <-- ⚠️ sửa tại đây
      console.log("📚 Dữ liệu sách từ API:", bookData);

      setBook({
        name: bookData.name || "",
        price: bookData.price || "",
        description: bookData.description || "",
        date: bookData.date ? bookData.date.slice(0, 10) : "",
        author:
          typeof bookData.author === "object"
            ? bookData.author._id
            : bookData.author || "",
        category:
          typeof bookData.category === "object"
            ? bookData.category._id
            : bookData.category || "",
      });

      setAuthors(authorRes.data.docs || authorRes.data || []);
      setCategories(categoryRes.data.docs || categoryRes.data || []);
    } catch (err) {
      console.error("❌ Lỗi khi tải dữ liệu sách:", err);
      alert("Lỗi tải dữ liệu sách");
    }
  };

  fetchData();
}, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/books/${id}`, book);
      alert("✅ Cập nhật sách thành công!");
      navigate("/");
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err.response?.data || err.message);
      alert("❌ Cập nhật thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Sửa sách</h2>

      <input
        type="text"
        name="name"
        value={book.name}
        onChange={handleChange}
        placeholder="Tên sách"
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="number"
        name="price"
        value={book.price}
        onChange={handleChange}
        placeholder="Giá"
        className="w-full p-2 border rounded mb-3"
      />
      <textarea
        name="description"
        value={book.description}
        onChange={handleChange}
        placeholder="Mô tả"
        className="w-full p-2 border rounded mb-3"
        rows={4}
      ></textarea>
      <input
        type="date"
        name="date"
        value={book.date}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      />
      <select
        name="author"
        value={book.author}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="">Chọn tác giả</option>
        {authors.map((a) => (
          <option key={a._id} value={a._id}>
            {a.name}
          </option>
        ))}
      </select>
      <select
        name="category"
        value={book.category}
        onChange={handleChange}
        className="w-full p-2 border rounded mb-3"
      >
        <option value="">Chọn danh mục</option>
        {categories.map((c) => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded w-full"
      >
        Cập nhật sách
      </button>
    </form>
  );
};

export default EditBook;
