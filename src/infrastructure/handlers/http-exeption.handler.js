const HttpStatus = require("../enumerators/httpCode.enum");
module.exports.HttpExceptionHandler = class HttpErrorHandler extends Error {
  constructor(
    msg = "Internal server error",
    status = HttpStatus.INTERNAL_ERROR
  ) {
    super(msg);
    this.name = "HttpExceptionHandler";
    this.statusCode = status;
    throw this;
  }
};
