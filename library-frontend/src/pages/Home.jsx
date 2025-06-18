import { useEffect, useState } from "react";
import { getBooks } from "../services/bookAPI";
import { Link, useSearchParams } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams] = useSearchParams(); // <-- Dùng để đọc query

  const fetchBooks = async () => {
    try {
      // Lấy query name và price từ URL
      const name = searchParams.get("name")?.toLowerCase() || "";
      const price = parseInt(searchParams.get("price"));

      const data = await getBooks();
      let filtered = data.docs || data || [];

      // Lọc theo tên (nếu có)
      if (name) {
        filtered = filtered.filter((book) =>
          book.name?.toLowerCase().includes(name)
        );
      }

      // Lọc theo giá (nếu có)
      if (!isNaN(price)) {
        filtered = filtered.filter((book) => book.price === price);
      }

      setBooks(filtered);
    } catch (err) {
      console.error("❌ Lỗi tải sách:", err);
    }
  };

  const fetchMeta = async () => {
    try {
      const authorRes = await axiosClient.get("/author");
      const categoryRes = await axiosClient.get("/categories");
      setAuthors(authorRes.data.docs || []);
      setCategories(categoryRes.data.docs || []);
    } catch (err) {
      console.error("❌ Lỗi tải tác giả/danh mục:", err);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMeta();
  }, [searchParams]); // Gọi lại khi query thay đổi

  const getAuthorName = (id) =>
    authors.find((a) => a._id === id)?.name || "Không rõ";
  const getCategoryName = (id) =>
    categories.find((c) => c._id === id)?.name || "Không rõ";

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sách này?");
    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/books/${id}`);
      alert("✅ Xóa sách thành công!");
      fetchBooks();
    } catch (err) {
      console.error("❌ Lỗi xóa sách:", err);
      alert("❌ Xóa sách thất bại!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        📚 Thư viện sách
      </h1>

      {books.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic">
          Không có sách nào để hiển thị.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {book.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    <strong>Giá:</strong>{" "}
                    {book.price?.toLocaleString("vi-VN")}đ
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Ngày xuất bản:</strong>{" "}
                    {book.date ? new Date(book.date).toLocaleDateString("vi-VN") : "Không rõ"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Tác giả:</strong> {getAuthorName(book.author)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    <strong>Danh mục:</strong> {getCategoryName(book.category)}
                  </p>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-3 italic">
                    {book.description || "Không có mô tả"}
                  </p>
                </div>

                <div className="mt-6 flex gap-2">
                  <Link
                    to={`/books/${book._id}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-sm rounded-md text-center transition"
                  >
                    👁️ Xem
                  </Link>
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 text-sm rounded-md text-center transition"
                  >
                    ✏️ Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 text-sm rounded-md text-center transition"
                  >
                    🗑️ Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
