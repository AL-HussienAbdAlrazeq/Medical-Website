import joi from "joi"
import JoiBase from 'joi';
import JoiDate from '@joi/date';
import { isValidObjectId } from "mongoose";

const Joi = JoiBase.extend(JoiDate);

const schema = Joi.date().format('YYYY-MM-DD').utc().required();
export const isValidObject = (value, helper) => {
  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid object");
};
export const createRadiologyValidation = joi
  .object()
  .keys({
    radiology_type: joi.string().optional().messages({
      "string.base": "Radiology type must be a string",
    }),

    radiologistNotes: joi.string().min(3).max(1000).optional().messages({
      "string.min": "Notes must be at least 3 characters",
      "string.max": "Notes must not exceed 1000 characters",
    }),
    file: joi.array().items({
      fieldname: joi.string(),
      originalname: joi.string(),
      encoding: joi.string(),
      mimetype: joi.string(),
      finalPath: joi.string(),
      destination: joi.string(),
      filename: joi.string(),
      path: joi.string(),
      size: joi.number(),
    }).required(),
    national_ID: joi.string()
      .length(14) // Ensure exactly 14 characters
      .required()
      .messages({
        "string.base": "Nid must be a string.",
        "string.length": "Nid must be exactly 14 digits.",
        "string.pattern.base": "Nid must contain only numbers.",
        "any.required": "Nid is required."
      }).required(),
    // citizen_id: joi.string().custom(isValidObjectId).required()
  })
  .required();



export const updateRadiologyValidation = joi.object({
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

  radiology_type: joi.string().optional().messages({
    "string.base": "Radiology type must be a string",
  }),

  radiologistNotes: joi.string().min(3).max(1000).optional().messages({
    "string.min": "Notes must be at least 3 characters",
    "string.max": "Notes must not exceed 1000 characters",
  }),


  file: joi.array().items({
    fieldname: joi.string(),
    originalname: joi.string(),
    encoding: joi.string(),
    mimetype: joi.string(),
    finalPath: joi.string(),
    destination: joi.string(),
    filename: joi.string(),
    path: joi.string(),
    size: joi.number(),
  }).optional(),
  id: joi.string().custom(isValidObjectId).required()

});



export const deleteRadiologyValidation = joi.object({
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

});
