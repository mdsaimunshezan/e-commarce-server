import express from "express";
import {
  payment,
  storeData,
  varifyPayment,
} from "../controllers/stripeController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-checkout-session", auth, payment);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  storeData
);
router.get("/varify-payment/:id", auth, varifyPayment);
export default router;
