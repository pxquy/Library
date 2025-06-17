import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const borrowRecordSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
    borrowDay: {
      type: String,
    },
    paymentDay: {
      type: String,
    },
  },
  {
    timeseries: true,
    versionKey: false,
  }
);

borrowRecordSchema.plugin(mongoosePaginate);

const Management = mongoose.model("Management", borrowRecordSchema);

export default Management;
