import { useEffect, useState } from "react";
import { getBooks } from "../services/bookAPI";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getBooks();
      setBooks(data.docs || []); // nếu bạn dùng paginate
    })();
  }, []);

  return (
    <div>
      <h1>Danh sách sách</h1>
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <Link to={`/books/${book._id}`}>{book.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
