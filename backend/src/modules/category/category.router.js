import { Router } from "express";
import * as categoryControllers from "./category.controller.js"
import auth, { availableRoles } from "../../middleware/auth.js";
const router = Router()



router.get("/",categoryControllers.getAllCategories)
router.get("/:id",categoryControllers.getCategoryById)

router.post("/",auth([availableRoles.admin]),categoryControllers.createNewCategory)
router.patch("/:id",auth([availableRoles.admin]),categoryControllers.updateCategoryById)
router.delete("/:id",auth([availableRoles.admin]),categoryControllers.deleteCategoryById)


export default router