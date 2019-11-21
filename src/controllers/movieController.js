import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const { movieService: { fetchMovies } } = services;

/**
 * @description Gets all movies
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const getMovies = async (request, response) => {
  const movies = await fetchMovies();
  return responseHelper(response, 200, {
    message: 'movies successfully retrieved',
    data: { movies }
  });
};

export default { getMovies };
