import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddBook from "./pages/AddBook";
import AuthorList from "./components/AuthorList";
import AddCategory from "./pages/AddCategory";
import CategoryList from "./components/CategoryList";

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
    </Routes>
  );
};

export default AppRoutes;
