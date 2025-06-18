import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import AuthorList from "./components/AuthorList";
import AddCategory from "./pages/AddCategory";
import CategoryList from "./pages/CategoryList"; // ✅ chỉ giữ 1 dòng này
import EditBook from "./pages/EditBook";
import EditCategory from "./pages/EditCategory";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/authors" element={<AuthorList />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/categories" element={<CategoryList />} />
      <Route path="/edit-book/:id" element={<EditBook />} />
      <Route path="/edit-category/:id" element={<EditCategory />} />
    </Routes>
  );
};

export default AppRoutes;
