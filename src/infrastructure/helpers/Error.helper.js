const defaultMessage = require('../constants/message/default.error.message');
const httpCode = require('../enumerators/httpCode.enum');
const BadRequestException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.BAD_REQUEST;
    }
    const error = new Error(message);
    error.statusCode = httpCode.BAD_REQUEST;
    return error;
};

const UnauthorizedException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.UNAUTHORIZED;
    }
    const error = new Error(message);
    error.statusCode = httpCode.UNAUTHORIZED;
    return error;
};

const NotFoundException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.NOT_FOUND;
    }
    const error = new Error(message);
    error.statusCode = httpCode.NOT_FOUND;
    return error;
};

const ForbiddenException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.FORBIDDEN;
    }
    const error = new Error(message);
    error.statusCode = httpCode.FORBIDDEN;
    return error;
};

const UnprocessableEntityException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.INVALID_PARAMETERS;
    }
    const error = new Error(message);
    error.statusCode = httpCode.INVALID_PARAMETERS;
    return error;
};
const GoneException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.GONE_ERROR;
    }
    const error = new Error(message);
    error.statusCode = httpCode.GONE_ERROR;
    return error;
};

const InternalServerErrorException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.INTERNAL_ERROR;
    }
    const error = new Error(message);
    error.statusCode = httpCode.INTERNAL_ERROR;
    return error;
};

const NotImplementedException = (message) => {
    if (!message || typeof message !== 'string') {
        message = defaultMessage.NOT_IMPLEMENTED;
    }
    const error = new Error(message);
    error.statusCode = httpCode.NOT_IMPLEMENTED;
    return error;
};
const ContentAlreadyExists = (message) => {
    if (!message || typeof message != 'string') {
        message = defaultMessage.CONTENT_ALREADY_EXISTS;
    }
    const error = new Error(message);
    error.status = httpCode.CONTENT_ALREADY_EXISTS;
    return error;
};

module.exports = {
    BadRequestException,
    NotFoundException,
    ForbiddenException,
    NotImplementedException,
    InternalServerErrorException,
    UnauthorizedException,
    UnprocessableEntityException,
    GoneException,
    ContentAlreadyExists,
};
