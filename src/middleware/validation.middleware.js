
export const validation = (schema) => {
  return (req, res, next) => {
    const inputs = { ...req.body, ...req.params, ...req.query };
    if (req.file || req.files?.length) {
      inputs.file = req.file || req.files
    }

    const validationResult = schema.validate(inputs, { abortEarly: false });
    if (validationResult.error) {
      return res.status(400).json({
        message: "validation error",
        details: validationResult.error.details,
      });
    }
    return next();
  };
};
