import Joi from "joi";

export const validateCategory = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Tên danh mục phải là kiểu chuỗi!",
    "string.empty": "Tên danh mục không được để trống!",
    "any.required": "Tên danh mục bắt buộc nhập",
  }),
});
