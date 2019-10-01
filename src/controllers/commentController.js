import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  commentService: {
    createComment, findComments
  },
  movieService: { findMovie }
} = services;

/**
 * @description Creates a comment for a movie
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const postComment = async (request, response) => {
  const {
    params: { episodeId },
    body: { commentBody },
    ip
  } = request;
  const movie = await findMovie(episodeId);
  if (!movie) {
    return responseHelper(response, 404, { error: 'movie not found' });
  }
  const comment = await createComment(episodeId, commentBody, ip);
  return responseHelper(response, 201, { comment });
};

/**
 * @description Gets all comments for a movie
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const getComments = async (request, response) => {
  const { episodeId } = request.params;
  const movie = await findMovie(episodeId);
  if (!movie) {
    return responseHelper(response, 404, { error: 'movie not found' });
  }
  const comments = await findComments(episodeId);
  return responseHelper(response, 200, { comments });
};

export default { postComment, getComments };
