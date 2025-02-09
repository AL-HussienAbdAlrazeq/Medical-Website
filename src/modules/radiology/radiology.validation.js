import joi from "joi"
import JoiBase from 'joi';
import JoiDate from '@joi/date';
import { isValidObjectId } from "mongoose";

const Joi = JoiBase.extend(JoiDate);

const schema = Joi.date().format('YYYY-MM-DD').utc().required();
export const createRadiologyValidation = joi
  .object()
  .keys({
    radiology_type: joi.string(),

    radiologistNotes: joi.string().min(3).max(1000).required(),
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
    radiology_date: schema,
    citizenNid: joi.string()
      .length(14) // Ensure exactly 14 characters
      .required()
      .messages({
        "string.base": "Nid must be a string.",
        "string.length": "Nid must be exactly 14 digits.",
        "string.pattern.base": "Nid must contain only numbers.",
        "any.required": "Nid is required."
      }).required(),
  })
  .required();



export const updateRadiologyValidation = joi.object({
  id: joi.string().custom(isValidObjectId).required(),

  radiology_type: joi.string().optional().messages({
    "string.base": "Radiology type must be a string",
  }),

  radiologistNotes: joi.string().min(3).max(1000).optional().messages({
    "string.min": "Notes must be at least 3 characters",
    "string.max": "Notes must not exceed 1000 characters",
  }),

  radiology_date: joi.date().iso().optional().messages({
    "date.base": "Invalid date format",
    "date.format": "Date must be in ISO format (YYYY-MM-DD)",
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
});
