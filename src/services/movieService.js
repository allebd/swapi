import { config } from 'dotenv';
import axios from 'axios';
import commentService from './commentService';

config();

const { SWAPI_URL } = process.env;
const FILMS_URL = `${SWAPI_URL}/films`;
const { countComment } = commentService;

/**
 * @description Extracts movie details for required response
 * @param {object} movieResult
 * @returns {object} a user object
 */
const movieExtract = (movieResult) => Promise.all(movieResult.map(async (movie) => {
  const { title, opening_crawl, episode_id } = movie;
  const commentCount = await countComment(episode_id);
  return {
    title,
    openingCrawl: opening_crawl,
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

  // Sort movies by release date
  const movieSort = results.sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateA - dateB;
  });

  return movieExtract(movieSort);
};

export default { findMovies };
