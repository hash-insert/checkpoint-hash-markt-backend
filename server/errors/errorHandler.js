const { StatusCodes } = require("http-status-codes");
const { CustomError, BadRequest } = require("../middlewares/customError");

// const errorHandler = (error, req, res, next) => {
//   console.error(
//     ` error in error handler -> ${error.message} ${error.statusCode}`
//   );

//   if (error instanceof CustomError) {
//     res.status(error.statusCode).json({ error: error.message });
//   } else {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ error: "Internal Server Error" });
//   }
// };

// module.exports = { errorHandler };
const errorHandler = (err, req, res, next) => {
  console.log("Middleware Error Hadnling");
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    success: false,
    statusCode: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = { errorHandler };
