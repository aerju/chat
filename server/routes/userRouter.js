import express from "express";
import {
  loginController,
  signupController,
} from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/login").post(loginController);
router.route("/signup").post(signupController);
// router.route("/start-chat").get( startChatController);

export default router;
