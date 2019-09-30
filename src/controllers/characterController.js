import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  characterService: {
    findCharacters,
    queryFilter,
    characterExtract,
    getMetadata
  },
  movieService: { findMovie }
} = services;

/**
 * @description Gets all movies characters and metadata
 * @param {object} request
 * @param {object} response
 * @returns {json} - json
 */
const getCharacters = async (request, response) => {
  const {
    params: { episodeId },
    query: { sort, order, filter }
  } = request;
  const movie = await findMovie(episodeId);
  if (!sort && order) {
    return responseHelper(response, 400, {
      error: 'order cannot be used without a sort parameter'
    });
  }
  if (!movie) {
    return responseHelper(response, 404, { error: 'movie not found' });
  }
  const characters = await findCharacters(movie);
  const charactersFilter = queryFilter(characters, sort, order, filter);
  const movieCharacters = characterExtract(charactersFilter);
  const metadata = getMetadata(movieCharacters);
  return responseHelper(response, 200, { movieCharacters, metadata });
};

export default { getCharacters };
