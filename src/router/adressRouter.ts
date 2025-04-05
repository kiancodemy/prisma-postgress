import { Router } from "express";
import { auth } from "../middleware/auth";
import { createAdress } from "../controler/adress";
const router: Router = Router();
router.post("/create", createAdress);

export default router;
