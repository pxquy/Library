import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, address, numberPhone } = req.body;
    const used = await User.findOne({ email, numberPhone });
    if (used)
      return res
        .status(401)
        .json({ message: "Email hoặc số điện thoại này đã được sử dụng" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      address,
      numberPhone,
    });
    user.password = undefined;

    return res.status(201).json({
      message: "Đăng ký tài khoản thành công!",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tìm thấy dữ liệu!",
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "Email này không tồn tại!",
      });
    const comparePassword = bcrypt.compare(password, user.password);

    const token = jwt.sign(
      { _id: user._id, role: user.role, name: user.name },
      process.env.KEY_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tìm thấy dữ liệu",
      error: error.message,
    });
  }
};

export const infoMe = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      message: "Thông tin của người dùng!",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tìm thấy dữ liệu!",
      error: error.message,
    });
  }
};

export const listUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, _search = "name", _keyword = "" } = req.query;
    const options = {
      page: parseInt(page), // Đổi kiểu dữ liệu cảu page về số nguyên
      limit: parseInt(limit), // Đổi kiểu dữ liệu của limit về số nguyên
    }

    const loaded =
      _search != "" && _keyword != ""
        ? { [_search]: { $regex: _keyword, $options: "" } }
        : {}
    //$regex dùng để tìm kiếm chuỗi trong MongoDB
    // $options: "i" để tìm kiếm không phân biệt chữ hoa chữ thường
    // $options: "m" để tìm kiếm nhiều dòng

    // req.body: Lấy dữ liệu từ form của người dùng gửi lên server
    // req.query: Lấy dữ liệu từ URL sau dấu ?
    const users = await User.paginate(loaded, options);
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng nào!",
      });
    }
    users.password = undefined; // Ẩn mật khẩu của người dùng
    return res.status(200).json({
      message: "Danh sách người dùng!",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "lỗi không tìm thấy dữ liệu!",
      error: error.message,
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng cần nhập!",
      });
    }
    return res.status(200).json({
      message: "Cập nhập người dùng thành công!",
      data: user,
    })

  } catch (error) {

  }
}