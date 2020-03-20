const REQ_EMAIL = 'EMAIL';
const REQ_REQUIRED = 'REQUIRED';
const REQ_LETTERS = 'LETTERS';
const REQ_NUMBERS = 'NUMBERS';
const REQ_MIN_LENGTH = 'MIN_LENGTH';
const REQ_MAX_LENGTH = 'MAX_LENGTH';
const REQ_PASSWORD = 'PASSWORD';

export const VAL_REQUIRED = () => ({ valType: REQ_REQUIRED });
export const VAL_EMAIL = () => ({ valType: REQ_EMAIL });
export const VAL_LETTERS = () => ({ valType: REQ_LETTERS });
export const VAL_NUMBERS = (min, max) => ({ valType: REQ_NUMBERS, min, max });
export const VAL_PASSWORD = () => ({ valType: REQ_PASSWORD });
export const VAL_MIN_LENGTH = length => ({ valType: REQ_MIN_LENGTH, length });
export const VAL_MAX_LENGTH = length => ({ valType: REQ_MAX_LENGTH, length });

const validatorsDictionary = {
  [REQ_REQUIRED]: value => value.trim().length > 0,
  [REQ_MAX_LENGTH]: (value, validator) => {
    return value.trim().length <= validator.length;
  },
  [REQ_MIN_LENGTH]: (value, validator) => {
    return value.trim().length >= validator.length;
  },
  [REQ_LETTERS]: value => {
    const expression = /[^A-Za-zа-яА-ЯіІёЁ]+/;
    return !expression.test(value);
  },
  [REQ_NUMBERS]: (value, validator) => {
    const expression = /^\d*[1-9]\d*$/;
    const minValidation = validator.min ? value >= validator.min : true;
    const maxValidation = validator.max ? value <= validator.max : true;
    return expression.test(value) && minValidation && maxValidation;
  },
  [REQ_EMAIL]: value => {
    // eslint-disable-next-line
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Zа-яА-ЯіІ\-0-9]+\.)+[a-zA-Zа-яА-ЯіІ]{2,}))$/;
    return expression.test(value);
  },
  [REQ_PASSWORD]: value => {
    const expression = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{6,})/;
    return expression.test(value);
  }
};

export const validate = (value, validators) => {
  const valValid = validators.reduce((validAccum, validator) => {
    return validAccum && validatorsDictionary[validator.valType](value, validator);
  }, true);
  return valValid;
};
