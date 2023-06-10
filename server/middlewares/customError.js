const { StatusCodes } = require("http-status-codes");
class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequest extends CustomError {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// let err = new BadRequest("error");
// console.log(err);

module.exports = { CustomError, BadRequest };
