import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest";
import { validateUser, signinValidate } from "../validations/user.validation";
import { infoMe, signin, signup } from "../controllers/user.controller";
import { verifyJWT } from "../middleware/verify";
import { recheckTo } from "../middleware/recheckTo";

const router = Router();

router.post("/signup", validateRequest(validateUser), signup);
router.post("/signin", signin);

router.use(verifyJWT);
router.use(recheckTo("user"));
router.get("/me", infoMe);

export default router;
