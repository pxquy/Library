import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { validateCategory } from "../validations/categories.validation";
import { verifyJWT } from "../middleware/verify";
import { recheckTo } from "../middleware/recheckTo";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categories.controller";

const router = Router();

router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

router.use(verifyJWT);
router.use(recheckTo("admin"));

router.post("/", validateRequest(validateCategory), createCategory);
router.put("/:id", validateRequest(validateCategory), updateCategory);
router.delete("/:id", deleteCategory);

export default router;
