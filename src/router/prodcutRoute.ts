import { Router } from "express";
import { adminauth } from "../middleware/admin";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
} from "../controler/prodcut";

const router: Router = Router();

router.post("/create", createProduct);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);
router.get("/getId/:id", getProduct);

export default router;
