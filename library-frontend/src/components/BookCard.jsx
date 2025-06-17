// src/components/BookCard.jsx
import React from "react";

const BookCard = ({ book }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-xl font-semibold">{book.name}</h3>
      <p className="text-gray-700">Giá: {book.price}đ</p>
      <p className="text-sm text-gray-500">{book.description}</p>
      <p className="text-sm mt-2">Tác giả: {book.author?.name || "Chưa có"}</p>
      <p className="text-sm">Danh mục: {book.category?.name || "Chưa có"}</p>
    </div>
  );
};

export default BookCard;
