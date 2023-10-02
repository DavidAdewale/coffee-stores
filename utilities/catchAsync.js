export function catchAsync(fn) {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      if (error.isOperational) {
        res.status(error.statusCode).json({
          message: error.status,
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: 'Something went very wrong',
          error: error.message,
        });
      }
    }
  };
}
