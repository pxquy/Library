// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthorList from "./components/AuthorList";
import BookDetail from "./pages/BookDetail";
import Home from "./pages/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/authors" element={<AuthorList />} />
      <Route path="/books/:id" element={<BookDetail />} />
    </Routes>
  );
};

export default AppRoutes;
