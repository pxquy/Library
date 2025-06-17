import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên của danh mục!"],
    },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

categoriesSchema.plugin(mongoosePaginate);

const Categories = mongoose.model("Categories", categoriesSchema);

export default Categories;
