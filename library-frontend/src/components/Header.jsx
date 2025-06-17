import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container-header">
      <h1 className="title-header">📚 Library</h1>
      <nav className="container-nav">
        <Link className="li li-home" to="/">
          Trang chủ
        </Link>{" "}
        |{" "}
        <Link className="li li-category" to="/categories">
          Danh mục
        </Link>{" "}
        |{" "}
        <Link className="li li-add-book" to="/add-book">
          Thêm sách
        </Link>{" "}
        |{" "}
        <Link className="li li-add-category" to="/add-category">
          Thêm danh mục
        </Link>
      </nav>
    </header>
  );
};

export default Header;
