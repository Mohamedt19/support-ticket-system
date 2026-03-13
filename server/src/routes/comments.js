import express from "express";
import auth from "../middleware/auth.js";
import validate from "../middleware/validate.js";
import { createCommentSchema } from "../validators/commentSchemas.js";
import {
  getComments,
  postComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/:id/comments", auth, getComments);
router.post("/:id/comments", auth, validate(createCommentSchema), postComment);

export default router;