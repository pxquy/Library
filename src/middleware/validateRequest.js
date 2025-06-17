export const validateRequest = (schema, target = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        error: "Lỗi kiểu dữ liệu!",
        details: error.details.map((err) => err.message),
      });
    }

    req[target] = value;

    next();
  };
};
