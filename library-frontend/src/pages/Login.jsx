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
      const res = await axios.post(
        "http://localhost:3000/api/auth/signin",
        form
      );
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
    <form onSubmit={handleLogin} className="form form-login">
      <h2 className="title-login">Đăng nhập</h2>

      <div className="form-login-input">
        <label className="title-input" htmlFor="">
          Nhập email của bạn
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="input input-email"
        />
      </div>

      <div className="form-login-input">
        <label className="title-input" htmlFor="">
          Nhập mật khẩu của bạn
        </label>
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          onChange={handleChange}
          required
          className="input input-password"
        />
      </div>

      <button type="submit" className="btn btn-submit">
        Đăng nhập
      </button>
      <div className="link-ref">
        <span>Quay lại trang</span>
        <a className="a-link" href="Register">
          {" "}
          đăng ký
        </a>
      </div>
    </form>
  );
};

export default Login;
