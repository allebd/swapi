import helpers from '../helpers';
import services from '../services';

const { responseMessage } = helpers;
const { movieService: { findMovies } } = services;

/**
 * @description Gets all movies
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const getMovies = async (request, response) => {
  const movies = await findMovies();
  return responseMessage(response, 200, { movies });
};

export default { getMovies };
