import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient"; // Đảm bảo file này có gửi token
import { useNavigate } from "react-router-dom";


const AddBook = () => {
  const [book, setBook] = useState({
    name: "",
    price: "",
    description: "",
    date: "",
    author: "",
    category: "",
  });
const navigate = useNavigate();

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load tác giả
    axiosClient
      .get("/author")
      .then((res) => {
        const data = res.data.docs || res.data || [];
        console.log("Tác giả:", data);
        setAuthors(data);
      })
      .catch((err) => {
        console.error("Lỗi tải tác giả:", err);
        alert("Bạn cần đăng nhập bằng tài khoản admin để tải tác giả");
      });

    // Load danh mục
    axiosClient
      .get("/categories")
      .then((res) => {
        const data = res.data.docs || res.data || [];
        console.log("Danh mục:", data);
        setCategories(data);
      })
      .catch((err) => {
        console.error("Lỗi tải danh mục:", err);
        alert("Bạn cần đăng nhập bằng tài khoản admin để tải danh mục");
      });
  }, []);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const { name, price, description, date, category, author } = book;

    // Gửi đủ 3 trường như backend yêu cầu
    const authorRes = await axiosClient.post("/author", {
      name: author,
      age: 30,
      numberPhone: 1234567890, // ví dụ giả định
    });

    const authorId = authorRes.data.createAuthor._id;

    const newBook = {
      name,
      price,
      description,
      date,
      category,
      author: authorId,
    };

    await axiosClient.post("/books", newBook);

    alert("✅ Thêm sách thành công!");
    
    setBook({
      name: "",
      price: "",
      description: "",
      date: "",
      author: "",
      category: "",
    });
    navigate("/");

  } catch (err) {
    console.error("❌ Lỗi thêm sách:", err.response?.data || err.message);
    alert("❌ Thêm sách thất bại: " + (err.response?.data?.message || "Lỗi không xác định"));
  }
};

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Thêm sách</h2>

      <input
        type="text"
        name="name"
        value={book.name}
        placeholder="Tên sách"
        onChange={handleChange}
        required
        maxLength={200} // 👈 GIỚI HẠN SỐ KÝ TỰ
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="number"
        name="price"
        value={book.price}
        placeholder="Giá"
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        name="description"
        value={book.description}
        placeholder="Mô tả"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="text"
        name="date"
        value={book.date}
        placeholder="Ngày xuất bản"
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
  type="text"
  name="author"
  value={book.author}
  onChange={handleChange}
  placeholder="Tên tác giả"
  required
  className="w-full mb-3 p-2 border rounded"
/>


      <select
        name="category"
        value={book.category}
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
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
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full"
      >
        Thêm sách
      </button>
    </form>
  );
};

export default AddBook;