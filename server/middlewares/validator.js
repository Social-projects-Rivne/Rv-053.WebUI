const {
  body,
  validationResult
} = require('express-validator');

//Password should be contain at least one uppercase, one lowercase and one digit
const regExpForPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
//Cyrillic and Latin characters, space and -
const regExpForNames = /[^A-Za-zа-яА-ЯіІїЇёЁ\s\-\']+/;

const loginValidation = () => {
  return [
    // normalize email
    body('email', 'Email is invalid')
    .trim()
    .isEmail()
    .normalizeEmail(),
    // password must be at least 6 chars long
    body('password', 'Your password must be between 6 and 30 characters')
    .trim()
    .isLength({
      min: 6,
      max: 30
    })
  ];
};

const registerValidation = () => {
  return [
    // normalize email
    body('email', 'Email is invalid')
    .trim()
    .isEmail()
    .normalizeEmail(),
    // password must be at least 6 chars long
    body('password', 'Your password must be between 6 and 30 characters')
    .trim()
    .isLength({
      min: 6,
      max: 30
    })
    .matches(regExpForPassword)
    .withMessage(
      'Password should be contain at least one uppercase, one lowercase and one digit'
    ),
    //first_name must be more then 3 letters and matches regExpForNames
    body('first_name')
    .trim()
    .isLength({
      min: 3,
      max: 100
    })
    .withMessage('Your first name must be between 3 and 100 characters')
    .not()
    .matches(regExpForNames, 'g')
    .withMessage('Wrong symbol in first name'),
    //last_name must be more then 2 letters and matches regExpForNames
    body('last_name')
    .trim()
    .isLength({
      min: 2,
      max: 100
    })
    .withMessage('Your last name must be between 2 and 100 characters')
    .not()
    .matches(regExpForNames, 'g')
    .withMessage('Wrong symbol in last name'),
    //Phone number may contains digit + - ( ) and space. Phone may be any location
    body('phone')
    .trim()
    .blacklist(/()\s\-\+/)
    .isMobilePhone('any')
    .withMessage('Wrong phone number')
  ];
};

const createEventValidation = () => {
  return [
    // normalize email
    body('name', 'Name of event is invalid')
    .notEmpty({
      ignore_whitespace: false
    })
    .isString(),
    // Event description >30
    body('description', 'Description should be more then 10 symbols')
    .notEmpty({
      ignore_whitespace: false
    })
    .isString()
    .isLength({
      min: 10
    }),
    //Location is string
    body('location', 'location field should not be empty')
    .notEmpty({
      ignore_whitespace: false
    })
    .isString(),
    // The format of Date YYYY-MM-DD
    body('datetime', 'Datetime field is invalid')
    .notEmpty({
      ignore_whitespace: false
    })
    .isISO8601(),
    //Phone number may contains digit + - ( ) and space. Phone may be any location
    body('duration', 'Duration field should not be empty')
    .notEmpty({
      ignore_whitespace: false
    })
    .isString(),
    body('max_participants', 'Max part field should not be empty')
    .notEmpty({
      ignore_whitespace: false
    }),
    body('min_age', 'Min age field should not be empty')
    .notEmpty({
      ignore_whitespace: false
    }),
    body('cover', 'Cover field should not be empty')
    .notEmpty({
      ignore_whitespace: false
    })
    .isString(),
    body('price', 'price field should not be empty')
    .notEmpty({
      ignore_whitespace: false
    })
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  loginValidation,
  registerValidation,
  createEventValidation,
  validate
};