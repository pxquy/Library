import Book from "../models/book.model";

export const getAllBook = async (req, res) => {
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
    const books = await Book.paginate(loaded, options);
    if (books.docs.length === 0) {
      return res.status(200).json({
        message: "Hiện tại trong thư viện đang không có sách!",
      });
    }
    return res.status(200).json(books);
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const getBook = await Book.findById(req.params.id);
    if (!getBook)
      return res.status(404).json({ message: "Không tìm thấy ID tồn tại" });
    return res.status(200).json({
      message: "Chi tiết sách: ",
      getBook,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const createBook = async (req, res) => {
  try {
    const createBook = await Book.create(req.body);
    return res.status(201).json({
      message: "Thêm mới sản phẩm thành công!",
      createBook,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const updateBook = async (req, res) => {
  try {
    const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateBook)
      return res
        .status(404)
        .json({ message: "Không tìm thấy ID của sách cần sửa!" });
    return res.status(201).json({
      message: "Sửa thông tin sách thành công",
      updateBook,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const deleteBook = async (req, res) => {
  try {
    const deleteBook = await Book.findByIdAndDelete(req.params.id);
    if (!deleteBook)
      return res
        .status(404)
        .json({ message: "Không tìm thấy ID sách cần xoá!" });
    return res.status(200).json({
      success: true,
      message: "Sản phẩm đã xoá:",
      deleteBook,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
