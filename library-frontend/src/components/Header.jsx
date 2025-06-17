import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>📚 Library</h1>
      <nav>
        <Link to="/">Trang chủ</Link> |{" "}
        <Link to="/categories">Danh mục</Link> |{" "}
        <Link to="/add-book">Thêm sách</Link> |{" "}
        <Link to="/add-category">Thêm danh mục</Link>
      </nav>
    </header>
  );
};

export default Header;
