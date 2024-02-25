const { body, validationResult } = require("express-validator");

const validateFields = [
  body("name").isString(),
  body("desc").isString(),
  body("email")
    .isEmail()
    .custom((value) => value.endsWith("@bitmesra.ac.in")),
  body("cost").isInt({ min: 0 }),
  body("condition").isIn(["new", "like-new", "used", "worn"]),
  body("category").isIn(["furniture", "electronics", "clothing", "books"]),
  body("number").isMobilePhone("any", { strictMode: false }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: "Fill the form properly." });
    }
    next();
  },
];

module.exports = validateFields;
