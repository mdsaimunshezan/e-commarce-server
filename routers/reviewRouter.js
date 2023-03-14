import express from "express";
import { addReview, getReivew, singelReview } from "../controllers/reviewController.js"
const router = express.Router();

router.post("/add-review",addReview);
router.get("/get-review",getReivew)
router.get("/single-review/:id",singelReview)

export default router;