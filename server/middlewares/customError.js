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
class Forbidden extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
class UnAuthorized extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
class InternalServerError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }
}
module.exports = {
  CustomError,
  BadRequest,
  Forbidden,
  UnAuthorized,
  InternalServerError,
};
