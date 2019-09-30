import { config } from 'dotenv';
import axios from 'axios';
import commentService from './commentService';
import helpers from '../helpers';

config();

const { SWAPI_URL } = process.env;
const FILMS_URL = `${SWAPI_URL}/films`;
const { countComment } = commentService;
const { sortHelper: { sortByDate } } = helpers;

/**
 * @description Extracts movie details for required response
 * @param {object} movieResult
 * @returns {object} a user object
 */
const movieExtract = (movieResult) => Promise.all(movieResult.map(async (movie) => {
  const {
    title,
    opening_crawl,
    episode_id,
    release_date
  } = movie;
  const commentCount = await countComment(episode_id);

  return {
    title,
    episodeId: episode_id,
    openingCrawl: opening_crawl,
    releaseDate: release_date,
    commentCount
  };
}));

/**
 * @description Finds all movies
 * @returns {object} a user object
 */
const findMovies = async () => {
  const movies = await axios.get(`${FILMS_URL}`);
  const { data: { results } } = movies;
  const movieSort = sortByDate(results);

  return movieExtract(movieSort);
};

/**
 * @description Finds a movie
 * @param {integer} episodeId
 * @returns {object} a user object
 */
const findMovie = async (episodeId) => {
  let movies = null;
  try {
    movies = await axios.get(`${FILMS_URL}/${episodeId}`);
  } catch (error) {
    movies = error.response;
  }
  const { data, status } = movies;
  if (status === 404) {
    return undefined;
  }
  return data;
};

export default { findMovies, findMovie };
