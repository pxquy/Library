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
    <form onSubmit={handleRegister} className="max-w-md mx-auto p-4">
      <input name="name" placeholder="Tên" onChange={handleChange} className="mb-2 w-full p-2 border" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} className="mb-2 w-full p-2 border" />
      <input name="password" type="password" placeholder="Mật khẩu" onChange={handleChange} className="mb-2 w-full p-2 border" />
      <input name="address" placeholder="Địa chỉ" onChange={handleChange} className="mb-2 w-full p-2 border" />
      <input name="numberPhone" placeholder="SĐT" onChange={handleChange} className="mb-4 w-full p-2 border" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Đăng ký</button>
    </form>
  );
};

export default Register;
