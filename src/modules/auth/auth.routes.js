import { Router } from "express";
import { validation } from "../../middleware/validation.middleware.js";
import {
  confirmEmail,
  login,
  signup
} from "./auth.controller.js";
import {
  confirmEmailVal,
  loginVal,
  registerVal,
} from "./auth.validation.js";

const authRouter = Router();


authRouter.post("/signup", validation(registerVal), signup);
authRouter.post(
  "/confirm-email",
  validation(confirmEmailVal),
  confirmEmail
);
authRouter.post("/login", validation(loginVal), login);
// authRouter.post("/login-with-gmail", loginWithGmail);

// authRouter.get("/refresh-token", refreshToken);
// authRouter.patch(
//   "/forget-password",
//   validation(forgetPasswordValidation),
//   forgetPassword
// );
// authRouter.patch(
//   "/valid-forget-password",
//   validation(validateForgetPasswordValidation),
//   validForgetPassword
// );
// authRouter.patch(
//   "/reset-password",
//   validation(resetPasswordValidation),
//   resetPassword
// );

// authRouter.post('/confirm-login' , confirmLogin)

export default authRouter;
