import Joi from "joi";

export const validateBook = Joi.object({
  name: Joi.string().trim().required().max(200).messages({
    "string.base": "Tên sách phải là kiểu chuỗi!",
    "string.empty": "Tên sách không được để trống!",
    "string.max": "Tên sách tối đa ${limit} ký tự!",
    "any.required": "Tên sách bắt buộc nhập",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Giá sách phải là kiểu số!",
    "number.min": "Giá tiền phải lớn hơn ${limit}",
    "any.required": "Vui lòng nhập giá tiền của sách!",
  }),
  description: Joi.string().trim().max(300).messages({
    "string.base": "Mô tả sách phải là kiểu chuỗi",
    "string.max": "Mô tả sách tối đa ${limit} ký tự",
  }),
  date: Joi.string().messages({
    "date.base": "Ngày phải có kiểu dữ liệu đúng!",
  }),
  author: Joi.string().required().messages({
    "string.base": "ID tác giả phải là kiểu chuỗi!",
    "string.empty": "ID tác giả không được để trống!",
    "any.required": "Vui lòng nhập đầy đủ ID tác giả",
  }),
  category: Joi.string().required().messages({
    "string.base": "ID danh mục phải là kiểu chuỗi!",
    "string.empty": "ID danh mục không được để trống!",
    "any.required": "Vui lòng nhập đầy đủ ID danh mục!",
  }),
});

export const updateValidate = validateBook.fork(
  ["name", "price", "author", "category"],
  (schema) => schema.optional()
);
