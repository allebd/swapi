/* istanbul ignore file */
import axios from 'axios';
import helpers from '../helpers';

const {
  sortHelper: {
    sortByString,
    sortByNumber
  },
  redisHelper: {
    existsAsync,
    getAsync,
    setAsync
  }
} = helpers;

/**
 * @description Fetches a character from endpoint
 * @param {string} characterUrl
 * @returns {object} an object
 */
const fetchCharacterFromEndpoint = async (characterUrl) => {
  const character = await axios.get(`${characterUrl}`);
  const { data } = character;
  await setAsync(`character:${characterUrl}`, JSON.stringify(data));
  return data;
};

/**
 * @description Fetches a character from cache
 * @param {string} characterUrl
 * @returns {object} an object
 */
const fetchCharacterFromCache = async (characterUrl) => {
  const character = await existsAsync(`character:${characterUrl}`);
  if (character) {
    const cachedCharacter = await getAsync(`character:${characterUrl}`);
    return JSON.parse(cachedCharacter);
  }
  return undefined;
};

/**
 * @description Fetch a character
 * @param {string} characterUrl
 * @returns {object} a user object
 */
const fetchCharacter = async (characterUrl) => {
  let characterResult = await fetchCharacterFromCache(characterUrl);
  if (!characterResult) {
    characterResult = await fetchCharacterFromEndpoint(characterUrl);
  }
  return characterResult;
};

/**
 * @description Fetches all characters of a movie
 * @param {string} movie
 * @returns {object} a user object
 */
const fetchCharacters = (movie) => {
  const { characters } = movie;
  const charactersDetails = Promise.all(characters.map(async (characterUrl) => {
    const character = await fetchCharacter(characterUrl).catch(() => {});
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
 * @description Gets Total Height in cm
 * @param {object} totalHeight
 * @param {object} unit
 * @returns {object} an object
 */
const getTotalHeightInCm = (totalHeight, unit) => ({
  unit,
  value: totalHeight
});

/**
 * @description Gets Total Height in Feet and Inches
 * @param {object} totalHeight
 * @param {object} unit
 * @returns {object} an object
 */
const getTotalHeightInFeetInches = (totalHeight, unit) => {
  const totalHeightInFeet = totalHeight / 30.48;
  const totalHeightInInches = (totalHeightInFeet % 1) * 12;
  return {
    unit,
    value: totalHeightInFeet.toFixed(2),
    text: `${Math.floor(totalHeightInFeet)}ft and ${totalHeightInInches.toFixed(2)} inches`
  };
};

/**
 * @description Get Characters Metadata
 * @param {object} characters
 * @returns {object} an object
 */
const getMetadata = (characters) => {
  const totalNumberOfCharacters = characters.length;
  // eslint-disable-next-line max-len
  const totalHeight = characters.reduce((total, character) => total + parseInt(character.height, 10), 0);
  const totalHeightInCm = getTotalHeightInCm(totalHeight, 'cm');
  const totalHeightInFeetInches = getTotalHeightInFeetInches(totalHeight, 'ft');
  return { totalNumberOfCharacters, totalHeightInCm, totalHeightInFeetInches };
};

export default {
  fetchCharacters,
  queryFilter,
  characterExtract,
  getMetadata,
  getTotalHeightInFeetInches
};
