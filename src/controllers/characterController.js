import helpers from '../helpers';
import services from '../services';

const { responseHelper } = helpers;
const {
  characterService: {
    fetchCharacters,
    queryFilter,
    characterExtract,
    getMetadata
  },
  movieService: { fetchMovie }
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
  const movie = await fetchMovie(episodeId);
  if (!sort && order) {
    return responseHelper(response, 400, {
      error: 'order cannot be used without a sort parameter'
    });
  }
  if (!movie) {
    return responseHelper(response, 404, { error: 'movie not found' });
  }
  const characters = await fetchCharacters(movie);
  const charactersFilter = queryFilter(characters, sort, order, filter);
  const movieCharacters = characterExtract(charactersFilter);
  const metadata = getMetadata(movieCharacters);
  return responseHelper(response, 200, {
    status: true,
    message: 'character successfully retrieved',
    data: [{ movieCharacters, metadata }]
  });
};

export default { getCharacters };
