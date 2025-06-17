import Author from "../models/author.model";
import Book from "../models/book.model";

export const getAllAuthor = async (req, res) => {
  const {
    _page = 1,
    _limit = 10,
    _sort = "age",
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
    const authors = await Author.paginate(loaded, options);
    if (authors.length == 0)
      return res.status(200).json({
        message: "Hiện tại trong thư viện đang không có thông tin tác giả nào!",
      });
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const getAuthorById = async (req, res) => {
  try {
    const getAuthor = await Author.findById(req.params.id);
    const listBook = await Book.find({ author: getAuthor });
    if (!getAuthor)
      return res
        .status(404)
        .json({ message: "Không tìm thấy ID tác giả tồn tại" });
    return res.status(200).json({
      message: "Chi tiết thông tin tác giả: ",
      getAuthor,
      listBook,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const createAuthor = async (req, res) => {
  try {
    const createAuthor = await Author.create(req.body);
    return res.status(201).json({
      message: "Thêm tác giả thành công!",
      createAuthor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const updateAuthor = async (req, res) => {
  try {
    const updateAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateAuthor)
      return res
        .status(404)
        .json({ message: "Không tìm thấy ID của tác giả cần sửa!" });
    return res.status(201).json({
      message: "Sửa thông tin tác giả thành công",
      updateAuthor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const deleteAuthor = async (req, res) => {
  try {
    const deleteAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deleteAuthor)
      return res
        .status(404)
        .json({ message: "Không tìm thấy ID tác giả cần xoá!" });
    return res.status(200).json({
      success: true,
      message: "Tác giả đã xoá:",
      deleteAuthor,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
