import Joi from "joi";

export const validateUser = Joi.object({
  name: Joi.string().trim().required().max(200).messages({
    "string.base": "Tên người dùng phải là kiểu chuỗi!",
    "string.empty": "Tên sách không được để trống!",
    "string.max": "Tên Người dùng tối đa ${limit} ký tự!",
    "any.required": "Tên người dùng bắt buộc nhập",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email phải có kiểu dữ liệu là chuỗi!",
    "string.email": "Email phải nhập đúng kiểu định dạng và phải có @",
    "any.required": "Vui lòng nhập Email của bạn!",
  }),
  password: Joi.string().max(8).required().messages({
    "string.base": "Mật khẩu phải là kiểu chuỗi!",
    "string.empty": "Mật khẩu không được để trống!",
    "string.max": "Mật khẩu tối đa ${limit} ký tự!",
    "any.required": "Vui lòng nhập đầy đủ mật khẩu!",
  }),
  role: Joi.string(),
  address: Joi.string().required().messages({
    "string.base": "Địa chỉ phải có kiểu dữ liệu là chuỗi!",
    "string.empty": "Địa chỉ không được để trống!",
    "any.required": "Vui lòng nhập đầy đủ địa chỉ!",
  }),
  numberPhone: Joi.string().required().messages({
    "string.base": "Số điện thoại phải là kiểu số!",
    "any.required": "Vui lòng nhập số điện thoại của tác giả!",
  }),
});

// export const signinValidate = validateUser.fork(
//   ["email", "password"],
//   (schema) => schema.optional()
// );
