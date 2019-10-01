import { validationResult } from 'express-validator';
import debug from 'debug';
import responseHelper from './responseHelper';

const log = debug('dev');

/**
   * @description Handles validator errors
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next - Express next middleware function
   * @return {Object} - Express response object
   */
const validatorError = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    const errorsArray = errors.array();
    const errorMessage = errorsArray.map((error) => ({
      field: error.param,
      message: error.msg
    }));

    return responseHelper(response, 400, {
      error: errorMessage
    });
  }
  next();
};

/**
   * @description Handles 404 errors
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next - Express next middleware function
   * @return {Object} - Express response object
   */
const error404 = (request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

/**
   * @description Handles development errors
   * @param {Object} error
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next - Express next middleware function
   * @return {Object} - Express response object
   */
const developmentError = (error, request, response) => {
  log(error.stack);

  response.status(error.status || 500);

  response.json({
    errors: {
      message: error.message,
      error
    }
  });
};

/**
   * @description Handles development errors
   * @param {Object} error
   * @param {Object} request
   * @param {Object} response
   * @param {Function} next - Express next middleware function
   * @return {Object} - Express response object
   */
const productionError = (error, request, response) => {
  response.status(error.status || 500);

  response.json({
    errors: {
      message: error.message
    }
  });
};

export default {
  validatorError,
  error404,
  developmentError,
  productionError
};
