import { createCategory, findCategories } from "../services/categoryService.js";

export async function postCategory(req, res, next) {
  try {
    const category = await createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
}

export async function getCategories(req, res, next) {
  try {
    const categories = await findCategories();
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
}