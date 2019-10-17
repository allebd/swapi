/**
 * @name sortByDate
 * @param {object} results
 * @param {string} sortBy
 * @returns {object} Server error response
 */
const sortByDate = (results, sortBy = 'release_date') => {
  const dateSort = results.sort((a, b) => {
    const dateA = new Date(a[sortBy]);
    const dateB = new Date(b[sortBy]);
    return dateA - dateB;
  });

  return dateSort;
};

/**
 * @name sortByString
 * @param {object} results
 * @param {string} sortBy
 * @returns {object} Server error response
 */
const sortByString = (results, sortBy) => {
  const stringSort = results.sort((a, b) => {
    const characterA = a[sortBy].toLowerCase();
    const characterB = b[sortBy].toLowerCase();
    if (characterA < characterB) return -1;
    if (characterA > characterB) return 1;
    return 0;
  });

  return stringSort;
};

/**
 * @name sortByNumber
 * @param {object} results
 * @param {string} sortBy
 * @returns {object} Server error response
 */
const sortByNumber = (results, sortBy) => {
  const numberSort = results.sort((a, b) => {
    const numberA = +a[sortBy];
    const numberB = +b[sortBy];
    return numberA > numberB;
  });

  return numberSort;
};

export default { sortByDate, sortByString, sortByNumber };
