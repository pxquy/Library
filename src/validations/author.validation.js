import Joi from "joi";

export const validateAuthor = Joi.object({
  name: Joi.string().trim().required().max(200).messages({
    "string.base": "Tên tác giả phải là kiểu chuỗi!",
    "string.empty": "Tên tác giả không được để trống!",
    "string.max": "Tên tác giả tối đa ${limit} ký tự!",
    "any.required": "Tên tác giả bắt buộc nhập",
  }),
  age: Joi.number().required().messages({
    "number.base": "Tuổi tác giả phải là kiểu số!",
    "any.required": "Vui lòng nhập tuổi của tác giả!",
  }),
  numberPhone: Joi.number().required().messages({
    "number.base": "Tuổi tác giả phải là kiểu số!",
    "any.required": "Vui lòng nhập tuổi của tác giả!",
  }),
});
