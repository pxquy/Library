import React, { useState } from "react";
import axiosClient from "../utils/axiosClient";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.post("/categories", { name });
      alert("✅ Thêm danh mục thành công!");
      setName("");
    } catch (err) {
      console.error("❌ Lỗi:", err.response?.data || err.message);
      alert("Thêm danh mục thất bại!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4">
      <h2 className="text-xl font-bold mb-4">Thêm danh mục mới</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tên danh mục"
        required
        className="w-full p-2 border mb-4 rounded"
      />
      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded w-full"
      >
        Thêm danh mục
      </button>
    </form>
  );
};

export default AddCategory;
