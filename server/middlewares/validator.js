const { body, validationResult } = require("express-validator");
const loginValidation = () => {
  return [
    // username must be an email
    body("email", "Email is invalid")
      .isEmail()
      .normalizeEmail(),
    // password must be at least 5 chars long
    body(
      "password",
      "Your password must be between 6 and 30 characters"
    ).isLength({ min: 6, max: 30 })
  ];
};

const registerValidation = () => {
  return [
    // username must be an email
    body("email", "Email is invalid")
      .isEmail()
      .normalizeEmail(),
    // password must be at least 5 chars long
    body(
      "password",
      "Your password must be between 6 and 30 characters"
    ).isLength({ min: 6, max: 30 }),
    body("first_name")
      .isLength({ min: 2, max: 100 })
      .isAlphanumeric(),
    body("last_name")
      .isLength({ min: 2, max: 100 })
      .isAlphanumeric(),
    body("phone")
      .optional()
      .isMobilePhone("uk-UA", { strictMode: false })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  loginValidation,
  validate,
  registerValidation
};
