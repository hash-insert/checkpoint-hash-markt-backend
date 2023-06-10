const { CustomError, BadRequest } = require("../middlewares/customError");

const errorHandler = (error, req, res, next) => {
  console.error(
    ` error in error handler -> ${error.message} ${error.statusCode}`
  );

  if (error instanceof BadRequest) {
    res.status(error.statusCode).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { errorHandler };
