import express from 'express';
import helpers from '../helpers';
import middlewares from '../middlewares';
import characterController from '../controllers/characterController';

const character = express.Router();
const CHARACTERS_URL = '/movie/:episodeId/characters';
const { tryCatchHelper } = helpers;
const { getCharacters } = characterController;
const { characterValidator: { getCharacterValidator } } = middlewares;

// Route to get all movie characters
character.get(`${CHARACTERS_URL}`, getCharacterValidator, tryCatchHelper(getCharacters));

export default character;
