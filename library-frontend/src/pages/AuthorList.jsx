// src/pages/AuthorList.jsx
import React, { useEffect, useState } from "react";
import { getAllAuthors } from "../services/authorAPI";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const data = await getAllAuthors();
      setAuthors(data.docs || []);
    };
    fetchAuthors();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Danh sách tác giả</h2>
      <ul className="space-y-2">
        {authors.map((author) => (
          <li key={author._id} className="border p-3 rounded shadow">
            <h3 className="text-lg font-semibold">{author.name}</h3>
            <p className="text-sm text-gray-600">Tuổi: {author.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
