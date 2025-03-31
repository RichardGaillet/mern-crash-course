import express from "express"
import {
  createProduct,
  readProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js"

const router = express.Router()

router.post("/", createProduct)

router.get("/", readProducts)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)

export default router
