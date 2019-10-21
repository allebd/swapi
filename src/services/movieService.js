/* istanbul ignore file */
import { config } from 'dotenv';
import axios from 'axios';
import commentService from './commentService';
import helpers from '../helpers';

config();

const { SWAPI_URL } = process.env;
const FILMS_URL = `${SWAPI_URL}/films`;
const { countComment } = commentService;
const {
  sortHelper: { sortByDate },
  redisHelper: {
    existsAsync,
    getAsync,
    setAsync
  }
} = helpers;

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
  const commentCount = await countComment(episode_id).catch(() => {});

  return {
    title,
    episodeId: episode_id,
    openingCrawl: opening_crawl,
    releaseDate: release_date,
    commentCount
  };
}));

/**
 * @description Fetches movies from endpoint
 * @returns {object} an object
 */
const fetchMoviesFromEndpoint = async () => {
  const movies = await axios.get(`${FILMS_URL}`);
  const { data: { results } } = movies;
  await setAsync(`movies:${FILMS_URL}`, JSON.stringify(results));
  return results;
};

/**
 * @description Fetches movies from cache
 * @returns {object} an object
 */
const fetchMoviesFromCache = async () => {
  const movies = await existsAsync(`movies:${FILMS_URL}`);
  if (movies) {
    const cachedMovies = await getAsync(`movies:${FILMS_URL}`);
    return JSON.parse(cachedMovies);
  }
  return undefined;
};

/**
 * @description Fetches all movies
 * @returns {object} an object
 */
const fetchMovies = async () => {
  let movieResults = await fetchMoviesFromCache();
  if (!movieResults) {
    movieResults = await fetchMoviesFromEndpoint();
  }
  const movieSort = sortByDate(movieResults);
  return movieExtract(movieSort);
};

/**
 * @description Fetches a movie from endpoint
 * @param {integer} episodeId
 * @returns {object} an object
 */
const fetchMovieFromEndpoint = async (episodeId) => {
  const movieUrl = `${FILMS_URL}/${episodeId}`;
  const movie = await axios.get(`${movieUrl}`).catch((error) => error.response);
  const { data, status } = movie;
  if (status === 404) {
    return undefined;
  }
  await setAsync(`movie:${movieUrl}`, JSON.stringify(data));
  return data;
};

/**
 * @description Fetches a movie from cache
 * @param {integer} episodeId
 * @returns {object} an object
 */
const fetchMovieFromCache = async (episodeId) => {
  const movieUrl = `${FILMS_URL}/${episodeId}`;
  const movie = await existsAsync(`movie:${movieUrl}`);
  if (movie) {
    const cachedMovie = await getAsync(`movie:${movieUrl}`);
    return JSON.parse(cachedMovie);
  }
  return undefined;
};

/**
 * @description Fetches a movie
 * @param {integer} episodeId
 * @returns {object} an object
 */
const fetchMovie = async (episodeId) => {
  let movieResult = await fetchMovieFromCache(episodeId);
  if (!movieResult) {
    movieResult = await fetchMovieFromEndpoint(episodeId);
  }
  return movieResult;
};

export default { fetchMovies, fetchMovie };
