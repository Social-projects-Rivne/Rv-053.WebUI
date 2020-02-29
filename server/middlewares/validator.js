const { body, validationResult } = require('express-validator');

//Password should be contain at least one uppercase, one lowercase and one digit
const regExpForPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
//Cyrillic and Latin characters, space and -
const regExpForNames = /[^A-Za-zа-яА-Я\s\-\']+/;

const loginValidation = () => {
  return [
    body('email', 'Email is invalid')
      .trim()
      .isEmail()
      .normalizeEmail(),
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
    body('email', 'Email is invalid')
      .trim()
      .isEmail()
      .normalizeEmail(),
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
    body('phone')
      .trim()
      .blacklist(/()\s\-\+/)
      .isMobilePhone('any')
      .withMessage('Wrong phone number')
  ];
};

const createEventValidation = () => {
  return [
    body('name', 'Name of event is invalid')
      .notEmpty({
        ignore_whitespace: false
      })
      .isString(),
    body('description', 'Description should be more then 10 symbols')
      .notEmpty({
        ignore_whitespace: false
      })
      .isString()
      .isLength({
        min: 10,
        max: 1000
      }),
    body('location', 'location field should not be empty')
      .notEmpty({
        ignore_whitespace: false
      })
      .isString(),
    body('datetime', 'Datetime field is invalid').notEmpty({
      ignore_whitespace: false
    }),
    body('duration', 'Duration field should not be empty').notEmpty({
      ignore_whitespace: false
    }),
    body('max_participants', 'Max part field should not be empty').notEmpty({
      ignore_whitespace: false
    }),
    body('min_age', 'Min age field should not be empty').notEmpty({
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
      .isString()
  ];
};

const profileValidation = () => {
  return [
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
    body('phone')
      .trim()
      .blacklist(/()\s\-\+/)
      .isMobilePhone('any')
      .withMessage('Wrong phone number'),
    body('birthday').custom(date => {
      const dateNow = new Date();
      const yearNow = dateNow.getFullYear();
      const birthDate = new Date(date * 1000);

      if (birthDate instanceof Date && !isNaN(birthDate)) {
        const birthYear = birthDate.getFullYear();

        if (yearNow - birthYear <= 10) {
          throw Error('You are very young');
        }

        if (yearNow - birthYear > 100) {
          throw Error('You are very old');
        }

        return true;
      }
      throw Error('Invalid date');
    }),
    body('avatar').custom(url => {
      try {
        return Boolean(new URL(url));
      } catch (e) {
        throw Error('Invalid url');
      }
    }),
    body('sex').isIn(['Male', 'Female'])
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err =>
    extractedErrors.push({
      [err.param]: err.msg
    })
  );

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  loginValidation,
  registerValidation,
  createEventValidation,
  profileValidation,
  validate
};
