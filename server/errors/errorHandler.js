const { StatusCodes } = require("http-status-codes");
const { CustomError, BadRequest } = require("../middlewares/customError");

const errorHandler = (error, req, res, next) => {
  console.error(
    ` error in error handler -> ${error.message} ${error.statusCode}`
  );

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

module.exports = { errorHandler };
