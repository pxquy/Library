import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchName, setSearchName] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (searchName) queryParams.set("name", searchName);
    if (searchPrice) queryParams.set("price", searchPrice);

    navigate(`/?${queryParams.toString()}`);
  };

  return (
    <header className="container-header">
      <h1 className="title-header">📚 Library</h1>

      {/* 🔍 Thanh tìm kiếm */}
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Tên sách"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá"
          value={searchPrice}
          onChange={(e) => setSearchPrice(e.target.value)}
        />
        <button type="submit">🔍 Tìm</button>
      </form>

      <nav className="container-nav">
        <Link className="li li-home" to="/">Trang chủ</Link>
        <Link className="li li-category" to="/categories">Danh mục</Link>
        <Link className="li li-add-book" to="/add-book">Thêm sách</Link>
        <Link className="li li-add-category" to="/add-category">Thêm danh mục</Link>
      </nav>
    </header>
  );
};

export default Header;
