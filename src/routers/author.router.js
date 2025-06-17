import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { validateAuthor } from "../validations/author.validation";
import { verifyJWT } from "../middleware/verify";
import { recheckTo } from "../middleware/recheckTo";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthor,
  getAuthorById,
  updateAuthor,
} from "../controllers/author.controller";

const router = Router();

router.get("/", getAllAuthor);
router.get("/:id", getAuthorById);

router.use(verifyJWT);
router.use(recheckTo("admin"));

router.post("/", validateRequest(validateAuthor), createAuthor);
router.put("/:id", validateRequest(validateAuthor), updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
