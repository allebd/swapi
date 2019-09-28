import models from '../database/models';

const { Comment } = models;

/**
 * Search for all comments by movieId
 * @param {string} movieId
 * @returns {object} a user object
 */
const countComment = async (movieId) => {
  const comment = await Comment.count({
    where: { movieId }
  });
  return comment;
};

export default { countComment };
