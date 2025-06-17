import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/author")
      .then((res) => {
        setAuthors(res.data.docs || []);
      })
      .catch((err) => {
        console.error("Lỗi khi tải danh sách tác giả:", err);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Danh sách tác giả</h2>
      <ul className="space-y-2">
        {authors.map((author) => (
          <li key={author._id} className="p-3 border rounded shadow">
            {author.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
