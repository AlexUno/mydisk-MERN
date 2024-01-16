import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";
import { check } from "express-validator";

const router = Router();

router.post(
  "/registration",
  [check("email").isEmail(), check("password").isLength({ min: 3, max: 12 })],
  authController.registration
);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export const AuthRouter = router;
