import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    numberPhone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/signup", form),
        alert("Đăng ký thành công!");
    } catch (err) {
      console.log("Lỗi chi tiết:", err.response?.data?.details);
      alert("Lỗi: " + err.response?.data?.error);
    }
  };

  return (
    <form onSubmit={handleRegister} className="form form-register">
      <h1 className="title-register">Đăng ký</h1>
      <div className="form-register-input">
        <label className="title-input" htmlFor="">
          Họ và tên
        </label>
        <input
          name="name"
          type="text"
          placeholder="Nhập tên của bạn..."
          onChange={handleChange}
          className="input input-name"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input" htmlFor="">
          Nhập email
        </label>
        <input
          name="email"
          type="email"
          placeholder="Nhập email của bạn..."
          onChange={handleChange}
          className="input input-email"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input" htmlFor="">
          Nhập mật khẩu
        </label>
        <input
          name="password"
          type="password"
          placeholder="Nhập password của bạn..."
          onChange={handleChange}
          className="input input-password"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input" htmlFor="">
          Nhập địa chỉ
        </label>
        <input
          name="address"
          type="text"
          placeholder="Nhập địa chỉ của..."
          onChange={handleChange}
          className="input input-address"
        />
      </div>
      <div className="form-register-input">
        <label className="title-input" htmlFor="">
          Nhập số điện thoại
        </label>
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
        <a className="a-link" href="Login">
          {" "}
          đăng nhập
        </a>
      </div>
    </form>
  );
};

export default Register;
