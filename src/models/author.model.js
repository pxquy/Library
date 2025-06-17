import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên tác giả!"],
      unique: [true, "Tên tác giải này đã tồn tại!"], //giả sử  muốn để trùng tên thôi nếu ví dụ muốn có trùng tên thì bỏ dòng này!
    },
    age: {
      type: Number,
      required: [true, "Vui lòng nhập tuổi cảu bạn!"],
    },
    numberPhone: {
      type: String,
      required: [true, "Vui lòng nhập số điện thoại liên hệ!"],
      unique: [true, "Số điện thoại này đã tồn tại!"],
    },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

authorSchema.plugin(mongoosePaginate);

const Author = mongoose.model("Author", authorSchema);

export default Author;
