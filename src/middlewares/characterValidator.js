import helpers from '../helpers';

const {
  errorHelper: { validatorError },
  validatorHelper: {
    isValidIntParam, isValidSort, isValidOrder, isValidFilter
  }
} = helpers;

const characterValidator = {
  getCharacterValidator: [
    isValidIntParam('episodeId'),
    isValidSort('sort').optional(),
    isValidOrder('order').optional(),
    isValidFilter('filter').optional(),
    validatorError
  ]
};

export default characterValidator;
