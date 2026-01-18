import ApiResponse from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  if (!err) return next();

  return res.status(err.statusCode).json(
    new ApiResponse(err.statusCode, null, err.message)
  );
};

export default errorHandler;
