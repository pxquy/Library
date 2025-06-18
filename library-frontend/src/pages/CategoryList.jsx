import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axiosClient.get("/categories");
      console.log("👉 API response:", res.data);

      // Lấy đúng mảng từ res.data.docs
      setCategories(Array.isArray(res.data.docs) ? res.data.docs : []);
    } catch (err) {
      console.error("❌ Lỗi tải danh mục:", err);
      setCategories([]); // fallback nếu lỗi
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa danh mục này?");
    if (!confirm) return;

    try {
      await axiosClient.delete(`/categories/${id}`);
      alert("✅ Xóa thành công!");
      fetchCategories(); // Tải lại danh sách
    } catch (err) {
      console.error("❌ Lỗi xóa danh mục:", err);
      alert("Xóa thất bại");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">📂 Danh sách danh mục</h1>

      {categories.length === 0 ? (
        <p>Không có danh mục nào.</p>
      ) : (
        <ul className="space-y-3">
          {categories.map((cate) => (
            <li
              key={cate._id}
              className="flex items-center justify-between border-b pb-2"
            >
              <span>{cate.name}</span>
              <div className="space-x-2">
                <Link
                  to={`/edit-category/${cate._id}`}
                  className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm"
                >
                  ✏️ Sửa
                </Link>
                <button
                  onClick={() => handleDelete(cate._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                >
                  🗑️ Xóa
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
