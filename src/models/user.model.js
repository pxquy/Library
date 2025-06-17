import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên của bạn!"],
      unique: [true, "Tên này đã được sử dụng!"],
    },
    email: {
      type: String,
      required: [true, "Vui lòng nhập email của bạn!"],
      unique: [true, "Email của bạn đã được sử dụng!"],
    },
    password: {
      type: String,
      minlength: [10, "Mật khẩu chỉ có tối đa 10 ký tự"],
      unique: [true, "Mật khẩu này đã được sử dụng!"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: {
      type: String,
      required: [true, "Vui lòng nhập thông tin địa chỉ!"],
    },
    numberPhone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại của bạn"],
    },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

export default User;
