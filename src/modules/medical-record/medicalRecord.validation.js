import joi from "joi"
import JoiBase from 'joi';
import JoiDate from '@joi/date';
import { isValidObjectId } from "mongoose";

const Joi = JoiBase.extend(JoiDate);
export const isValidObject = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid object");
};

const schema = Joi.date().format('YYYY-MM-DD').utc().required();
export const createMedicalRecordValidation = joi
  .object()
  .keys({
    // treatment: joi.array().items(joi.string()).required(),
    // diagnosis: joi.array().items(joi.string()).required(),
    treatment: joi.string().required(),
    diagnosis: joi.string().required(),
    national_ID: joi.string()
      .length(14) // Ensure exactly 14 characters
      .required()
      .messages({
        "string.base": "Nid must be a string.",
        "string.length": "Nid must be exactly 14 digits.",
        "string.pattern.base": "Nid must contain only numbers.",
        "any.required": "Nid is required."
      }).required(),
    clinic_name: joi.string().required(),
    clinic_code: joi.number().required(),
    // citizen_id: joi.string().custom(isValidObjectId).required()

  })
  .required();



export const updateMedicalRecordValidation = joi
  .object({
    treatment: joi.string().min(3).max(1000).optional(),
    diagnosis: joi.string().min(3).max(1000).optional(),
    national_ID: joi.string()
      .length(14) // Exactly 14 characters
      .pattern(/^[0-9]+$/) // Ensure it contains only digits
      .required()
      .messages({
        "string.base": "national_ID must be a string.",
        "string.length": "national_ID must be exactly 14 digits.",
        "string.pattern.base": "national_ID must contain only numbers.",
        "any.required": "national_ID is required."
      }),
    clinic_name: joi.string().min(3).max(255).optional(),
    clinic_code: joi.number().integer().optional(),
    status: joi.boolean().optional(),
    id: joi.string().custom(isValidObjectId).required()
  })
  .required();

export const deleteMedicalRecordValidation = joi
  .object({
    national_ID: joi.string()
      .length(14)
      .pattern(/^[0-9]+$/) // Must be all digits
      .required()
      .messages({
        "string.base": "national_ID must be a string.",
        "string.length": "national_ID must be exactly 14 digits.",
        "string.pattern.base": "national_ID must contain only numbers.",
        "any.required": "national_ID is required."
      }),
    id: joi.string().custom(isValidObjectId).required()
  })
  .required();