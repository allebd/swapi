import axios from 'axios';
import helpers from '../helpers';

const { sortHelper: { sortByString, sortByNumber } } = helpers;

/**
 * @description Find a character
 * @param {string} characterUrl
 * @returns {object} a user object
 */
const findCharacter = async (characterUrl) => {
  const character = await axios.get(`${characterUrl}`);
  const { data } = character;
  return data;
};

/**
 * @description Find all characters of a movie
 * @param {string} movie
 * @returns {object} a user object
 */
const findCharacters = (movie) => {
  const { characters } = movie;
  const charactersDetails = Promise.all(characters.map(async (characterUrl) => {
    const character = await findCharacter(characterUrl);
    return character;
  }));
  return charactersDetails;
};

/**
 * @description Filters list of characters
 * @param {object} characters
 * @param {string} sortBy
 * @param {string} orderBy
 * @param {string} filterByGender
 * @returns {object} a user object
 */
const queryFilter = (characters, sortBy = null, orderBy = 'asc', filterByGender = null) => {
  let newCharacters = characters;

  if (sortBy) {
    if (sortBy === 'height') {
      newCharacters = sortByNumber(characters, sortBy);
    }
    newCharacters = sortByString(characters, sortBy);

    if (orderBy === 'desc') {
      newCharacters = newCharacters.reverse();
    }
  }

  if (filterByGender) {
    // eslint-disable-next-line max-len
    newCharacters = characters.filter(character => character.gender === filterByGender.toLowerCase());
  }
  return newCharacters;
};

/**
 * @description Extracts character details for required response
 * @param {object} characterResult
 * @returns {object} a user object
 */
const characterExtract = (characterResult) => (characterResult.map((character) => {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender
  } = character;

  return {
    name,
    height,
    mass,
    hairColor: hair_color,
    skinColor: skin_color,
    eyeColor: eye_color,
    birthYear: birth_year,
    gender
  };
}));

/**
 * @description Get Characters Metadata
 * @param {object} characters
 * @returns {object} a user object
 */
const getMetadata = (characters) => {
  const totalNumberOfCharacters = characters.length;
  // eslint-disable-next-line max-len
  const totalHeight = characters.reduce((total, character) => total + parseInt(character.height, 10), 0);
  const totalHeightInFeet = totalHeight / 30.48;
  const totalHeightInInches = (totalHeightInFeet % 1) * 12;
  const totalHeightInCm = `${totalHeight}cm`;
  const totalHeightInFeetInches = `${Math.floor(totalHeightInFeet)}ft and ${totalHeightInInches.toFixed(2)} inches`;
  return { totalNumberOfCharacters, totalHeightInCm, totalHeightInFeetInches };
};

export default {
  findCharacters,
  queryFilter,
  characterExtract,
  getMetadata
};
