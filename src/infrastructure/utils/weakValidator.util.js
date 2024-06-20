const {
  NotFoundException,
  UnprocessableEntityException,
  UnauthorizedException,
} = require("../helpers/Error.helper");
const weakValidationToOneNotFoundedVariable = (variable) => {
  if (variable === null || variable === undefined) {
    throw NotFoundException();
  }
};

const weakValidation = (variable, message = null) => {
  if (!variable) {
    throw UnprocessableEntityException(message);
  }
};

const weakValidationToTwoVariables = (variable, variable2, message = null) => {
  if (!variable || !variable2) {
    throw UnprocessableEntityException(message);
  }
};

function hasAtLeastOneNullOrUndefinedValue(variables) {
  return Object.keys(variables).find(
    (key) =>
      variables[key] === null ||
      variables[key] === undefined ||
      typeof variables == "undefined"
  );
}

const userIsOn = (userId) => {
  if (!userId) throw UnauthorizedException("Precisa estar logado");
};

const tokenMatchesUserId = (userId, ctx) => {
  if (userId && ctx.auth_user_id && userId !== ctx.auth_user_id)
    throw UnauthorizedException("Acesso negado");
};

const hasAtLeastOneDefinedValue = (...variables) => {
  if (variables.find((key) => variables[key])) {
    throw UnprocessableEntityException();
  }
};

const weakValidationToNVariables = (...variables) => {
  if (hasAtLeastOneNullOrUndefinedValue(variables)) {
    throw UnprocessableEntityException();
  }
};

const weakValidatorHasOnlyOneDefined = (...variables) => {
  const filter = variables.filter((e) => e);
  if (filter.length !== 1) {
    throw UnprocessableEntityException();
  }
};

const weakValidationToManyNotFoundedVariables = (...variables) => {
  if (hasAtLeastOneNullOrUndefinedValue(variables)) {
    throw NotFoundException();
  }
};

const weakValidationIfVariableIsNaN = (variable) => {
  if (variable && Number.isNaN(variable)) {
    throw UnprocessableEntityException();
  }
};

const weakValidationIfVariableIsNotArray = (variable) => {
  if (!Array.isArray(variable)) {
    throw UnprocessableEntityException();
  }
};

const weakCompareBetweenTwoVariables = (variable, variable2) => {
  if (variable !== variable2) {
    throw UnauthorizedException();
  }
};

const buildFilter = (object) => {
  const filter = {};
  Object.keys(object).forEach((key) => {
    if (typeof object[key] !== "undefined") {
      filter[key] = object[key];
    }
  });
  return filter;
};

module.exports = {
  weakValidationToOneNotFoundedVariable,
  weakValidationToManyNotFoundedVariables,
  weakValidation,
  weakValidationToTwoVariables,
  weakValidationToNVariables,
  weakValidationIfVariableIsNaN,
  weakValidationIfVariableIsNotArray,
  weakCompareBetweenTwoVariables,
  userIsOn,
  hasAtLeastOneDefinedValue,
  weakValidatorHasOnlyOneDefined,
  buildFilter,
  tokenMatchesUserId,
};
