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

/**
 * Creates a comment in the database
 * @param {string} movieId
 * @param {string} commentBody
 * @param {string} publicIp
 * @returns {object} a user object
 */
const createComment = async (movieId, commentBody, publicIp) => {
  const createdComment = await Comment.create({
    movieId, commentBody, publicIp
  });
  return createdComment;
};

/**
 * Fetches all comment from the database by movie id
 * @param {string} offset
 * @param {string} limit
 * @param {string} movieId
 * @returns {object} a comment object
 */
const fetchComments = async (offset, limit, movieId) => {
  const comment = await Comment.findAll({
    offset,
    limit,
    where: { movieId },
    order: [['createdAt', 'DESC']]
  });
  return comment;
};

export default { countComment, createComment, fetchComments };
