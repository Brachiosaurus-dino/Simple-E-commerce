import express from "express"
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router()


router.get("/" ,getProduct)

router.post("/", createProduct)

router.put("/:id",updateProduct)  


router.delete("/:id",deleteProduct)


export default router



// Here all routes have only slashes because the server,js has writes this is a prefix "/api/products" and the other slshes are these "/ , /:id"

// we use app.use to enter > product.routes.js then enter > product controller.js to do CRUd operations 