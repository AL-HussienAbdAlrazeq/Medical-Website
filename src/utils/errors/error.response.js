export const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      error.cause = 500;
      return next(error);
    });
  };
};

export const globalErrorHandling = (error, req, res, next) => {
  const code = error.statusCode || 500;
  res.status(code).json({ error: "Error", message: error.message, code, stack: error.stack });
}
