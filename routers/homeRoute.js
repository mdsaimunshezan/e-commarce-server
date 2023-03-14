import express from "express"
import { getCategoryProdect } from "../controllers/homeController.js";


const router = express.Router();

router.get("/category-prodect/:name/:page?",getCategoryProdect)
router.get("/search-prodect/:keyword/:page?",getCategoryProdect)



export default router