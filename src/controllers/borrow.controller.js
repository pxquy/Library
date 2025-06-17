import Management from "../models/borrowRecord.model";
import Author from "../models/author.model";
import Book from "../models/book.model";
import User from "../models/user.model";

export const getAllManagements = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "price",
    _order = "desc",
    _search = "name",
    _keyword = "",
  } = req.query;
  const sortOption = { [_sort]: _order === "desc" ? 1 : -1 };
  const options = {
    page: parseInt(_page),
    limit: parseInt(_limit),
    sort: sortOption,
  };

  const loaded =
    _keyword && _keyword.trim() !== ""
      ? { [_search]: { $regex: _keyword, $options: "i" } }
      : {};
  try {
    const managements = await Management.paginate(loaded, options);
    if (managements.length == 0)
      return res.status(200).json({
        message:
          "Hiện tại trong thư viện đang không có thông tin mượn trả nào!",
      });
    return res.status(200).json(managements);
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};

export const getManagementById = async (req, res) => {
  try {
    const getManagement = await Management.findById(req.params.id)
      .populate("userId", "name")
      .populate("bookId", "name")
      .populate("authorId", "name");
    if (!getManagement)
      return res
        .status(404)
        .json({ message: "Không tìm thấy ID sách mượn trả tồn tại!" });
    return res.status(200).json({
      message: "Chi tiết thông tin sách được mượn trả: ",
      getManagement,
      messages: [
        `Người mượn là ${getManagement.userId?.name}`,
        `Tên sách là: ${getManagement.bookId?.name}`,
        `Tên tác giả của sách: ${getManagement.authorId?.name}`,
      ],
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const createManagement = async (req, res) => {
  try {
    const createManagement = await Management.create(req.body);
    return res.status(201).json({
      message: "Sách cho mượn thành công!",
      createManagement,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const updateManagement = async (req, res) => {
  try {
    const updateManagement = await Management.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateManagement)
      return res.status(404).json({
        message: "Không tìm thấy ID của quản lý sách cần sửa cần sửa!",
      });
    return res.status(201).json({
      message: "Sửa thông tin sách cho mượn thành công!",
      updateManagement,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const deleteManagement = async (req, res) => {
  try {
    const deleteManagement = await Management.findByIdAndDelete(req.params.id);
    if (!deleteManagement)
      return res
        .status(404)
        .json({ message: "Không tìm thấy ID quản lý sách cần xoá!" });
    return res.status(200).json({
      success: true,
      message: "Tác giả đã xoá:",
      deleteManagement,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
