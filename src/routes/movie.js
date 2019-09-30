import express from 'express';
import helpers from '../helpers';
import movieController from '../controllers/movieController';

const movie = express.Router();
const MOVIES_URL = '/movies';
const { tryCatchHelper } = helpers;
const { getMovies } = movieController;

// Route to get all movies
movie.get(`${MOVIES_URL}`, tryCatchHelper(getMovies));

export default movie;
