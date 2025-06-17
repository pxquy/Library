import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { validateBorrow } from "../validations/borrowRecord.validation";
import { verifyJWT } from "../middleware/verify";
import { recheckTo } from "../middleware/recheckTo";
import {
  createManagement,
  deleteManagement,
  getAllManagements,
  getManagementById,
  updateManagement,
} from "../controllers/borrow.controller";

const router = Router();
router.get("/", getAllManagements);

router.get("/:id", getManagementById);

router.use(verifyJWT);
router.use(recheckTo("admin"));
router.post("/create", createManagement);
router.put("/update/:id", updateManagement);
router.delete("/:id", deleteManagement);

export default router;
