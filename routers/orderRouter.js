import express from "express";
import { getOrder, singleGetOrder, updateDelevert, updateStatus, userOrder } from "../controllers/orderController.js";
const router = express.Router();

router.get("/all-order",getOrder);
router.get("/user-order/:id",userOrder)
router.get("/single-order/:id",singleGetOrder)
router.put("/order-status/:id",updateStatus)
router.put("/order-delevert/:id",updateDelevert)

export default router;