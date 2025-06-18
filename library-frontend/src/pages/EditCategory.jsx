import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axiosClient.get(`/categories/${id}`);
        setName(res.data.name || "");
      } catch (err) {
        console.error("❌ Lỗi tải danh mục:", err);
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/categories/${id}`, { name });
      alert("✅ Cập nhật danh mục thành công!");
      navigate("/categories"); // 👈 quay về danh sách
    } catch (err) {
      console.error("❌ Lỗi cập nhật:", err.response?.data || err.message);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form form-category max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">📝 Sửa danh mục</h2>
      <div className="form-category-input mb-4">
        <label className="block mb-1 font-medium">Tên danh mục</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên danh mục"
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Lưu thay đổi
      </button>
    </form>
  );
};

export default EditCategory;
