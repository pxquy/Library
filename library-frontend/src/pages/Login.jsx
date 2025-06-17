import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signin", form);
      const token = res.data.token;

      // Lưu token vào localStorage để sử dụng sau
      localStorage.setItem("token", token);

      alert("Đăng nhập thành công!");
      navigate("/"); // 👉 chuyển về trang chủ
    } catch (err) {
      console.error("Lỗi đăng nhập:", err.response?.data || err.message);
      alert("Lỗi: " + (err.response?.data?.message || "Đăng nhập thất bại"));
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="password"
        name="password"
        placeholder="Mật khẩu"
        onChange={handleChange}
        required
        className="w-full mb-4 p-2 border rounded"
      />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Đăng nhập
      </button>
    </form>
  );
};

export default Login;
