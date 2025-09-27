import express from "express";
import { signUp,SignIn } from "../controllers/userController";
const router = express.Router();
router.post("/SignUp",signUp);
router.post("/SignIn",SignIn);
export default router;