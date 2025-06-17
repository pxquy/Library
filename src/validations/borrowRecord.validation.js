import Joi from "joi";

export const validateBorrow = Joi.object({
  userId: Joi.string().required().messages({
    "string.base": "ID người dùng phải là kiểu chuỗi!",
    "string.empty": "ID người dùng không được để trống!",
    "any.required": "Vui lòng nhập đầy đủ ID người dùng",
  }),
  authorId: Joi.string().required().messages({
    "string.base": "ID tác giả phải là kiểu chuỗi!",
    "string.empty": "ID tác giả không được để trống!",
    "any.required": "Vui lòng nhập đầy đủ ID tác giả",
  }),
  bookId: Joi.string().required().messages({
    "string.base": "ID sách phải là kiểu chuỗi!",
    "string.empty": "ID sách không được để trống!",
    "any.required": "Vui lòng nhập đầy đủ ID sách!",
  }),
  borrowDay: Joi.string().messages({
    "date.base": "Ngày phải có kiểu dữ liệu đúng!",
  }),
  paymentDay: Joi.string().messages({
    "date.base": "Ngày phải có kiểu dữ liệu đúng!",
  }),
});
