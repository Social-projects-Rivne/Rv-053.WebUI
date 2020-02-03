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
export const VAL_NUMBERS = () => ({ valType: REQ_NUMBERS });
export const VAL_PASSWORD = (length, keys) => ({ valType: REQ_PASSWORD, length, keys });
export const VAL_MIN_LENGTH = value => ({
  valType: REQ_MIN_LENGTH,
  length: value,
});
export const VAL_MAX_LENGTH = value => ({
  valType: REQ_MAX_LENGTH,
  length: value,
});

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
  [REQ_NUMBERS]: value => {
    const expression = /^\d*[1-9]\d*$/;
    return expression.test(value);
  },
  [REQ_EMAIL]: value => {
    // eslint-disable-next-line
    const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Zа-яА-ЯіІ\-0-9]+\.)+[a-zA-Zа-яА-ЯіІ]{2,}))$/;
    return expression.test(value);
  },
  [REQ_PASSWORD]: value => {
    const expression = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.{6,})/;
    return expression.test(value);
  },
};

export const validate = (value, validators) => {
  console.log(validatorsDictionary);
  const valValid = validators.reduce((validAccum, validator) => {
    return validAccum && validatorsDictionary[validator.valType](value, validator);
  }, true);
  return valValid;
};
