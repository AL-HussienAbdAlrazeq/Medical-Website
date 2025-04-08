import joi from "joi";
import { genders } from "../../Database/models/citizen.model.js";
import { roles } from "../../Database/models/user.model.js";


export const registerVal = joi
  .object({
    // national_ID: joi.string()
    //   .length(14) // Ensure exactly 14 characters
    //   .pattern(/^\d+$/) // Ensure it contains only digits
    //   .required()
    //   .messages({
    //     'string.base': 'National_ID must be a string.',
    //     'string.length': 'National_ID must be exactly 14 digits.',
    //     'string.pattern.base': 'National_ID must contain only numbers.',
    //     'any.required': 'National_ID is required.',
    //   }),
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmationPassword: joi.string().valid(joi.ref("password")).required(),
    userName: joi.string().min(3).max(100).required(),

    genders: joi.string().valid(...Object.values(genders)),
    role: joi.string().valid(...Object.values(roles)),
  })
  .required();

export const loginVal = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  })
  .required();



export const sendOTP = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();

export const sendOtpForgetPassword = joi
  .object({
    email: joi.string().email().required(),
  })
  .required();

export const getAllEmailAssociateWithRecoveryEmail = joi
  .object({
    recoveryEmail: joi.string().email().required(),
  })
  .required();

export const confirmForgetPassword = joi
  .object({
    email: joi.string().email().required(),
    otp: joi.string().length(5).required(),
    password: joi.string().required(),
  })
  .required();

export const refreshToken = joi
  .object({
    refreshToken: joi.string().required(),
  })
  .required();

export const confirmEmailVal = joi
  .object({
    email: joi.string().email().required(),
    code: joi.string().length(4).required(),
  })
  .required();