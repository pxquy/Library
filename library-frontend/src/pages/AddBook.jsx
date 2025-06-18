import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosClient";
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

      const authorRes = await axiosClient.post("/author", {
        name: author,
        age: 30,
        numberPhone: 1234567890,
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
      alert(
        "❌ Thêm sách thất bại: " +
          (err.response?.data?.message || "Lỗi không xác định")
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form form-add-book">
      <h2 className="title-add-book">Thêm sách</h2>

      <div className="form-group">
        <input
          type="text"
          name="name"
          value={book.name}
          placeholder="Tên sách"
          onChange={handleChange}
          required
          maxLength={200}
          className="input"
        />
      </div>

      <div className="form-group">
        <input
          type="number"
          name="price"
          value={book.price}
          placeholder="Giá"
          onChange={handleChange}
          required
          className="input"
        />
      </div>

      <div className="form-group">
        <textarea
          name="description"
          value={book.description}
          placeholder="Mô tả"
          onChange={handleChange}
          className="textarea"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="date"
          value={book.date}
          placeholder="Ngày xuất bản"
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Tên tác giả"
          required
          className="input"
        />
      </div>

      <div className="form-group">
        <select
          name="category"
          value={book.category}
          onChange={handleChange}
          required
          className="select"
        >
          <option value="">Chọn danh mục</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-submit-book">
        Thêm sách
      </button>
    </form>
  );
};

export default AddBook;
