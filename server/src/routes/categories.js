import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { createCategorySchema } from "../validators/categorySchemas.js";
import {
  postCategory,
  getCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", auth, getCategories);
router.post("/", auth, validate(createCategorySchema), postCategory);

export default router;