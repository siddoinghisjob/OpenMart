const { query, validationResult } = require('express-validator');

const validateIdAsBigInt = [
  query('id').isBigInt().toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateIdAsBigInt
};
