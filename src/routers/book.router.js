import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { validateBook, updateValidate } from "../validations/book.validation";
import { verifyJWT } from "../middleware/verify.js";
import { recheckTo } from "../middleware/recheckTo";
import {
  createBook,
  deleteBook,
  getAllBook,
  getBookById,
  updateBook,
} from "../controllers/book.controller";

const router = Router();

router.get("/", getAllBook);
router.get("/:id", getBookById);

router.use(verifyJWT);
router.use(recheckTo("admin"));

router.post("/", validateRequest(validateBook), createBook);
router.put("/:id", validateRequest(updateValidate), updateBook);
router.delete("/:id", deleteBook);

export default router;
