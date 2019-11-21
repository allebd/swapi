import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  commentService: {
    createComment, fetchComments, countComment
  },
  movieService: { fetchMovie }
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
  const movie = await fetchMovie(episodeId);
  if (!movie) {
    return responseHelper(response, 404, { error: 'movie not found' });
  }
  const comment = await createComment(episodeId, commentBody, ip);
  return responseHelper(response, 201, {
    message: 'comments successfully added',
    data: { comment }
  });
};

/**
 * @description Gets all comments for a movie
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const getComments = async (request, response) => {
  const {
    params: { episodeId },
    query: { page = 1, limit = 10 }
  } = request;
  const movie = await fetchMovie(episodeId);
  if (!movie) {
    return responseHelper(response, 404, { error: 'movie not found' });
  }
  const countComments = await countComment(episodeId);
  if (!countComments) {
    return responseHelper(response, 404, { error: 'comments not found' });
  }
  const pages = Math.ceil(countComments / limit);
  if (page > pages) {
    return responseHelper(response, 404, { error: 'page not found' });
  }
  const offset = limit * (page - 1);
  const comments = await fetchComments(offset, limit, episodeId);
  return responseHelper(response, 200, {
    message: 'comments successfully retrieved',
    data: {
      comments,
      currentPage: page,
      totalPages: pages,
      limit
    }
  });
};

export default { postComment, getComments };
