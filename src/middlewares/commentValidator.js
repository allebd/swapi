import helpers from '../helpers';

const {
  errorHelper: { validatorError },
  validatorHelper: {
    isValidIntParam, isValidComment
  }
} = helpers;

const commentValidator = {
  postCommentValidator: [
    isValidIntParam('episodeId'),
    isValidComment('commentBody'),
    validatorError
  ]
};

export default commentValidator;
