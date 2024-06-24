import { Router } from "express";
import auth, { availableRoles } from "../../middleware/auth.js";
import * as bookController from "./book.controller.js";
import * as bookValidator from "./book.validation.js";
import { fileUpload, fileValidation } from "../../utils/multer.js";
import { validation } from "../../middleware/validation.js";
const router = Router();

router.get(
  "/wishlist",
  auth([availableRoles.user, availableRoles.admin]),
  bookController.getWishList
);
router.patch(
  "/wishlist/clear",
  auth([availableRoles.user, availableRoles.admin]),
  bookController.clearAllWishList
);
router.patch(
  "/wishlist/add/:bookId",
  auth([availableRoles.user, availableRoles.admin]),
  bookController.addToWishList
);
router.patch(
  "/wishlist/remove/:bookId",
  auth([availableRoles.user, availableRoles.admin]),
  bookController.removeFromWishList
);

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);

router.post(
  "/",
  auth([availableRoles.admin]),
  fileUpload(fileValidation.image).single("coverImage"),
  validation(bookValidator.create),
  bookController.createNewBook
);
router.put("/:id", auth([availableRoles.admin]), bookController.updateBookById);

router.delete(
  "/:id",
  auth([availableRoles.admin]),
  bookController.deleteBookById
);

export default router;
