import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  getSingleCategory,
  randomCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import { adminAuth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-category", adminAuth, createCategory);
router.get("/get-category", adminAuth, getCategory);
router.get("/all-category", getAllCategory);
router.get("/rendom-category", randomCategory);
router.get("/single-category/:id", adminAuth, getSingleCategory);
router.put("/update-category/:id", adminAuth, updateCategory);
router.delete("/delete-category/:id", adminAuth, deleteCategory);

export default router;
