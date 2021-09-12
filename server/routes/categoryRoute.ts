import express from "express";
import categoryController from "../controllers/categoryControler";
import auth from "../middlewares/auth";

const router = express.Router();

router
  .route("/category")
  .get(categoryController.getCategories)
  .post(auth, categoryController.createCategory);

router
  .route("/category/:id")
  .patch(auth, categoryController.updateCategories)
  .delete(auth, categoryController.deleteCategories);

export default router;
