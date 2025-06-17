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
    <form onSubmit={handleSubmit} className="form form-category">
      <h2 className="title-category">Thêm danh mục mới</h2>
      <div className="form-category-input">
        <label className="title-input" htmlFor="">
          Nhập tên danh mục
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên danh mục"
          required
          className="input input-name"
        />
      </div>
      <button type="submit" className="btn btn-submit-category">
        Thêm danh mục
      </button>
    </form>
  );
};

export default AddCategory;
