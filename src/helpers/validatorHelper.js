import { check, param, query } from 'express-validator';

/**
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidComment = field => check(field)
  .exists()
  .withMessage(`${field} is a required field`)
  .not()
  .isEmpty({ ignore_whitespace: true })
  .withMessage(`${field} cannot be empty`)
  .isLength({ max: 500 })
  .withMessage('maximum allowed characters is 500');

/**
   * @param {String} paramName
   * @returns {Object} - Express-validator
   */
const isValidIntParam = paramName => param(paramName)
  .exists()
  .withMessage(`${paramName} is a required field`)
  .trim()
  .not()
  .isEmpty()
  .withMessage(`${paramName} cannot be empty`)
  .isInt()
  .withMessage(`${paramName} must be an integer`);

/**
 * Validates sort query
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidSort = field => query(field)
  .trim()
  .isIn(['name', 'gender', 'height'])
  .withMessage(`${field} can only be one of: 'name', 'gender', 'height'`);

/**
 * Validates order query
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidOrder = field => query(field)
  .trim()
  .isIn(['asc', 'desc'])
  .withMessage(`${field} can only be one of: 'asc', 'desc'`);

/**
 * Validates filter query
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidFilter = field => query(field)
  .trim()
  .not()
  .isEmpty()
  .withMessage(`${field} cannot be empty`);

/**
 * Validates integer query
   * @param {String} field
   * @returns {Object} - Express-validator
   */
const isValidInt = field => query(field)
  .trim()
  .not()
  .isEmpty()
  .withMessage(`${field} cannot be empty`)
  .isInt()
  .withMessage(`${field} must be an integer`);

export default {
  isValidIntParam,
  isValidComment,
  isValidSort,
  isValidOrder,
  isValidFilter,
  isValidInt
};
