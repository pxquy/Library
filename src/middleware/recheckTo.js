export const recheckTo = (...roles) => {
  return async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(400).json({
        message: "Bạn không có quyền!",
      });
    }
    next();
  };
};
