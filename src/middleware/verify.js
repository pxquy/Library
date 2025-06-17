import jwt from "jsonwebtoken";

export const verifyJWT = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  console.log(req.headers?.authorization?.split(" ")[1]);

  if (!token) {
    return res.status(400).json({ message: "Không tìm thấy địa chỉ!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.KEY_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(404).json({ message: "không tìm thấy dữ liệu!" });
  }
};
