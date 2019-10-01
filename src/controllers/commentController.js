import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  commentService: {
    createComment
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

export default { postComment };
