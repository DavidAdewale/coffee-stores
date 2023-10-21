const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (error, res) => {
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
};

export const handleError = (err, res) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err, message: err.message };
    console.log(error);
    sendErrorProd(error, res);
  }
};
