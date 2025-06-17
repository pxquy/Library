import { Router } from "express";
import routerBook from "./book.router";
import routerCategory from "./categories.router";
import routerUser from "./user.router";
import routerAuthor from "./author.router";
import routerManagement from "./borrowRecord.router";

const router = Router();

router.use("/books", routerBook);
router.use("/categories", routerCategory);
router.use("/auth", routerUser);
router.use("/author", routerAuthor);
router.use("/management", routerManagement);

export default router;
