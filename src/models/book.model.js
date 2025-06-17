import { number } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên sách bắt buộc nhập!"],
      minlength: [0, "Tên sản phẩm tối đa 200 ký tự!"],
      lowercase: true,
    },
    price: {
      type: Number,
      min: [0, "Giá tiền phải lớn hơn 0"],
      required: [true, "Vui lòng nhập giá tiền"],
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      require: [true, "Vui lòng nhập id tác giả!!"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      require: [true, "Vui lòng nhập id danh mục!"],
    },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

bookSchema.plugin(mongoosePaginate);

const Book = mongoose.model("Book", bookSchema);

export default Book;
