import JoiBase from 'joi';
import JoiDate from '@joi/date';
import { isValidObjectId } from 'mongoose';

// Extend Joi with date functionalities
const Joi = JoiBase.extend(JoiDate);

// Custom Joi schema for birth_date
const schema = Joi.date().format('YYYY-MM-DD').utc().required();

// Create Citizen Validation Schema
export const createCitizenValidation = Joi.object({
  national_ID: Joi.string()
    .length(14) // Ensure exactly 14 characters
    .pattern(/^\d+$/) // Ensure it contains only digits
    .required()
    .messages({
      'string.base': 'National_ID must be a string.',
      'string.length': 'National_ID must be exactly 14 digits.',
      'string.pattern.base': 'National_ID must contain only numbers.',
      'any.required': 'National_ID is required.',
    }),
  full_name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Full name must be a string.',
    'string.min': 'Full name must be at least 3 characters long.',
    'string.max': 'Full name can be up to 100 characters long.',
    'any.required': 'Full name is required.',
  }),
  address: Joi.array()
    .items(
      Joi.string().min(5).max(255).required().messages({
        "string.base": "Each address must be a string.",
        "string.min": "Each address must be at least 5 characters long.",
        "string.max": "Each address can be up to 255 characters long.",
        "any.required": "Each address is required.",
      })
    )
    .min(1) // At least one address required
    .required()
    .messages({
      "array.base": "Address must be an array of strings.",
      "array.min": "At least one address is required.",
      "any.required": "Address is required.",
    }),
  blood_type: Joi.string()
    .valid('A', 'B', 'AB', 'O', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+', 'O-', 'O+')
    .required()
    .messages({
      'string.base': 'Blood type must be a string.',
      'any.required': 'Blood type is required.',
      'any.only': 'Blood type must be one of "A", "B", "AB", or "O".',
    }),
  birth_date: schema.messages({
    'date.base': 'Birth date must be a valid date.',
    'any.required': 'Birth date is required.',
  }),
}).required();

// Update Citizen Validation Schema
export const updateCitizenValidation = Joi.object({
  full_name: Joi.string().min(3).max(1000).optional().messages({
    'string.base': 'Full name must be a string.',
    'string.min': 'Full name must be at least 3 characters long.',
    'string.max': 'Full name can be up to 1000 characters long.',
  }),
  address: Joi.string().optional().messages({
    'string.base': 'Address must be a string.',
  }),
  blood_type: Joi.string().valid('A', 'B', 'AB', 'O').optional().messages({
    'string.base': 'Blood type must be a string.',
    'any.only': 'Blood type must be one of "A", "B", "AB", or "O".',
  }),
  birth_date: Joi.date().format('YYYY-MM-DD').utc().optional().messages({
    'date.base': 'Birth date must be a valid date.',
  }),
  id: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'ID must be a string.',
      'any.required': 'ID is required.',
      'any.invalid': 'ID is not a valid ObjectId.',
    }),
}).required();
