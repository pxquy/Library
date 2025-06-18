import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thêm dòng này

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    numberPhone: "",
  });

  const navigate = useNavigate(); // Thêm dòng này

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/signup", form);
      alert("Đăng ký thành công!");
      navigate("/login"); // 👉 Chuyển hướng sang trang đăng nhập
    } catch (err) {
      console.log("Lỗi chi tiết:", err.response?.data?.details);
      alert("Lỗi: " + (err.response?.data?.error || "Đăng ký thất bại"));
    }
  };

  return (
    <form onSubmit={handleRegister} className="form form-register">
      <h1 className="title-register">Đăng ký</h1>
      <div className="form-register-input">
        <label className="title-input">Họ và tên</label>
        <input
          name="name"
          type="text"
          placeholder="Nhập tên của bạn..."
          onChange={handleChange}
          className="input input-name"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input">Nhập email</label>
        <input
          name="email"
          type="email"
          placeholder="Nhập email của bạn..."
          onChange={handleChange}
          className="input input-email"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input">Nhập mật khẩu</label>
        <input
          name="password"
          type="password"
          placeholder="Nhập mật khẩu của bạn..."
          onChange={handleChange}
          className="input input-password"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input">Nhập địa chỉ</label>
        <input
          name="address"
          type="text"
          placeholder="Nhập địa chỉ của bạn..."
          onChange={handleChange}
          className="input input-address"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input">Nhập số điện thoại</label>
        <input
          name="numberPhone"
          type="text"
          placeholder="Nhập số điện thoại của bạn..."
          onChange={handleChange}
          className="input input-numberPhone"
        />
      </div>
      <button type="submit" className="btn btn-submit">
        Đăng ký
      </button>
      <div className="link-ref">
        <span>Quay lại trang</span>
        <a className="a-link" href="/login">đăng nhập</a>
      </div>
    </form>
  );
};

export default Register;
