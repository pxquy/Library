import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/categories")
      .then((res) => {
        setCategories(res.data.docs || res.data); // tùy cấu trúc response
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh mục:", err);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">📚 Danh sách danh mục</h2>
      <ul className="list-disc pl-5">
        {categories.map((cate) => (
          <li key={cate._id}>{cate.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
