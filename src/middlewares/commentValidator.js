import helpers from '../helpers';

const {
  errorHelper: { validatorError },
  validatorHelper: {
    isValidIntParam, isValidComment, isValidInt
  }
} = helpers;

const commentValidator = {
  postCommentValidator: [
    isValidIntParam('episodeId'),
    isValidComment('commentBody'),
    validatorError
  ],
  getCommentValidator: [
    isValidIntParam('episodeId'),
    isValidInt('page').optional(),
    isValidInt('limit').optional(),
    validatorError
  ]
};

export default commentValidator;
