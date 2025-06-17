import Categories from "../models/categories.model";
import Book from "../models/book.model";

export const getAllCategories = async (req, res) => {
  const { _search = "name", _keyword = "" } = req.query;

  const loaded =
    _keyword && _keyword.trim() !== ""
      ? { [_search]: { $regex: _keyword, $options: "i" } }
      : {};

  console.log(loaded);
  try {
    const getCategories = await Categories.paginate(loaded);
    if (getCategories.length == 0)
      return res.status(200).json({
        message: "Hiện không có danh mục nào!",
      });
    return res.status(200).json(getCategories);
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const getCategoryById = async (req, res) => {
  try {
    const getCategory = await Categories.findById(req.params.id);
    const listBooks = await Book.find({ category: getCategory });
    if (!getCategory)
      return res.status(404).json({
        message: "Không tìm thấy Id danh mục phù hợp!",
      });
    return res.status(200).json({
      message: "Chi tiết danh mục",
      getCategory,
      listBooks,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const createCategory = async (req, res) => {
  try {
    const createCategory = await Categories.create(req.body);
    return res.status(201).json({
      message: "Thêm danh mục thành công",
      createCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const updateCategory = await Categories.findByIdAndDelete(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateCategories)
      return res.status(404).json({
        message: "Không tìm thấy Id danh mục cần sửa!",
      });
    return res.status(201).json({
      message: "Sửa danh mục thành công",
      updateCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const deleteCategory = await Categories.findByIdAndDelete(req.params.id);
    if (!deleteCategory)
      return req.status(404).json({
        message: "Không tìm thấy ID danh mục cần xoá!",
      });
    return res.status(200).json({
      success: true,
      message: "Xoá danh mục:",
      deleteCategory,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Lỗi không tồn tại dữ liệu",
      error: error.message,
    });
  }
};
