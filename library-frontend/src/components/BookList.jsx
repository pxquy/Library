import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import axios from "axios";

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((res) => {
        setBooks(res.data.docs || []);
      })
      .catch((err) => {
        console.error("Lỗi khi lấy sách:", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {books.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
