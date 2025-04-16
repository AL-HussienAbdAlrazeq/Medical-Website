



import bcrypt from "bcrypt"


import { emailEvent } from "../../utils/event/emailEvent.js";
import { asyncHandler } from "../../utils/response/error.response.js";
import { successResponse } from "../../utils/response/success.response.js";
import { compareHash, generateHash } from "../../utils/security/hash.security.js";
import { generateToken } from "../../utils/security/token.security.js";
import User from "../../Database/models/user.model.js";


export const signup = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  if (await User.findOne({ email })) {
    return next(new Error("Email Exist", { cause: 409 }));
  }
  const hashPassword = generateHash({ plainText: password });
  const user = await User.create({ userName, email, password: hashPassword });
  emailEvent.emit("sendConfirmEmail", { id: user._id, email });
  return successResponse({ res, status: 201, message: "Done" });
});

export const confirmEmail = asyncHandler(async (req, res, next) => {
  const { email, code } = req.body;
  
  const user = await User.findOne({email:email})
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  if (user.confirmEmail) {
    return next(new Error("Already Verified", { cause: 409 }));
  }
  if (!compareHash({ plainText: code, hashValue: user.confirmEmailOTP })) {
    return next(new Error("Invalid Code ", { cause: 400 }));
  }
  const codeExpiry = new Date(Date.now() + 2 * 60 * 1000);
  user.codeExpiry = codeExpiry;
  await user.save();
  await User.updateOne(
    { email },
    { confirmEmail: true, $unset: { confirmEmailOTP: 0 } }
  );
  return successResponse({ res, status: 200, message: "Done" });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email});
  if (!user) {
    return next(new Error("User not found", { cause: 404 }));
  }
  if (!user.confirmEmail) {
    return next(new Error("Please Verify your account first", { cause: 409 }));
  }
  // if (!compareHash({ plainText: password, hashValue: user.password })) {
  //   return next(new Error("Invalid Account", { cause: 400 }));
  // }
  if (!bcrypt.compareSync(password , user.password)) {
    return next(new Error("Invalid Account", { cause: 400 }));
  }
  const national_ID = user.national_ID
  const role = user.role
  const token = generateToken({
    payload: { email, national_ID,role },
    options: { expiresIn: "5h" },
  });


  return successResponse({
    res,
    status: 200,
    message: "Done",
    data: {token},
  });
});





