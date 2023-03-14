import express from "express"
import { createProdect, deleteProdect, getProdect, getSingleProdect, updateProdect } from "../controllers/prodectController.js";
import multer from "multer";
import { adminAuth } from "../middlewares/auth.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    },
    
  })

const upload = multer({ storage: storage })


router.post("/create-prodect",upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 }
  ]) ,createProdect)
router.get("/get-prodect",adminAuth,getProdect)
router.get("/single-prodect/:id",getSingleProdect)
router.delete("/delete-prodect/:id",adminAuth,deleteProdect)
router.put("/update-prodect/:id",upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 }
]) ,adminAuth,updateProdect)

export default router