/* istanbul ignore file */
/**
 * @name tryCatchHandler
 * @param {function} controller
 * @returns {object} Server error response
 */
const tryCatchHelper = controller => async (req, res, next) => {
  try {
    await controller(req, res);
  } catch (err) {
    next(err);
  }
};

export default tryCatchHelper;
