const REQ_EMAIL = 'EMAIL';
const REQ_REQUIRED = 'REQUIRED';
const REQ_LETTERS = 'LETTERS';
const REQ_PHONE = 'PHONE';
const REQ_MIN_LENGTH = 'MIN_LENGTH';
const REQ_MAX_LENGTH = 'MAX_LENGTH';

export const VAL_REQUIRED = () => ({ valType: REQ_REQUIRED });
export const VAL_EMAIL = () => ({ valType: REQ_EMAIL });
export const VAL_LETTERS = () => ({ valType: REQ_LETTERS });
export const VAL_PHONE = () => ({ valType: REQ_PHONE });
export const VAL_MIN_LENGTH = value => ({
	valType: REQ_MIN_LENGTH,
	length: value,
});
export const VAL_MAX_LENGTH = value => ({
	valType: REQ_MAX_LENGTH,
	length: value,
});

export const validate = (value, validators) => {
	let valValid = true;
	for (const validator of validators) {
		if (validator.valType === REQ_REQUIRED) {
			valValid = valValid && value.trim().length > 0;
		}
		if (validator.valType === REQ_EMAIL) {
			// eslint-disable-next-line
			const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			valValid = valValid && expression.test(value);
		}
		if (validator.valType === REQ_LETTERS) {
			const expression = /[^A-Za-zа-яА-ЯіІёЁ]+/;
			valValid = valValid && !expression.test(value);
		}
		if (validator.valType === REQ_PHONE) {
			// need expression
			// const expression = /[^A-Za-zа-яА-ЯіІёЁ]+/;
			// valValid = valValid && !expression.test(value);
		}
		if (validator.valType === REQ_MIN_LENGTH) {
			valValid = valValid && value.trim().length > validator.length - 1;
		}
		if (validator.valType === REQ_MAX_LENGTH) {
			valValid = valValid && value.trim().length < validator.length + 1;
		}
	}
	return valValid;
};
