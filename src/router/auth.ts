import { Router } from "express";
import { login, signup } from "../controler/auth";
const router: Router = Router();
router.post("/signup", signup);
router.post("/login", login);

export default router;
