import { Router } from "express";
import { auth } from "../middleware/auth";
import { login, signup, all, updateuser } from "../controler/auth";

const router: Router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/all", all);
router.put("/updateuser", updateuser);

export default router;
