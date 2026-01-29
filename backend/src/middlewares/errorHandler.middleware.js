const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

    if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "User is already an admin of this society",
    });
  }

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
