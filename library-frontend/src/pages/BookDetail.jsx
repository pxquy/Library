import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/bookAPI";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getBookById(id);
      setBook(data.getBook);
    })();
  }, [id]);

  if (!book) return <p>Đang tải...</p>;

  return (
    <div>
      <h2>{book.name}</h2>
      <p>Giá: {book.price} đ</p>
      <p>Mô tả: {book.description}</p>
    </div>
  );
};

export default BookDetail;
