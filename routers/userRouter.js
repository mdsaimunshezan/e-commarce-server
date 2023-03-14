import express from "express"
import { getUser, login, reguster } from "../controllers/userController.js";

const router = express.Router();

router.post("/reguster",reguster)
router.post("/login",login)
router.get("/get-customer",getUser)


export default router