const { StatusCodes } = require("http-status-codes");
class CustomError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequest extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = { CustomError, BadRequest };
