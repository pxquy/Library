import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { validateUser, signinValidate } from "../validations/user.validation";
import { infoMe, listUsers, signin, signup, updateUser } from "../controllers/user.controller";
import { verifyJWT } from "../middleware/verify";
import { recheckTo } from "../middleware/recheckTo";

const router = Router();

router.post("/signup", validateRequest(validateUser), signup);
router.post("/signin", signin);

router.use(verifyJWT);
router.use(recheckTo("admin", "user"));
router.get("/me", infoMe);
router.get("/list", listUsers)
router.get("/update/:id", validateRequest(validateUser), updateUser);


export default router; 
