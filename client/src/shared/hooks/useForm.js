import { useReducer, useCallback } from 'react';

const reducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
		case 'INPUT_CHANGED':
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (!state.inputs[inputId]) {
					continue;
				}
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: { value: action.value, isValid: action.isValid },
				},
				formValidity: formIsValid,
			};
		case 'SET_DATA':
			return {
				inputs: action.inputs,
				formValidity: action.formValidity,
			};
	}
};

export const useForm = (initialInputs, initialFormValidity) => {
	const [formState, dispatch] = useReducer(reducer, {
		inputs: initialInputs,
		formValidity: initialFormValidity,
	});
	const inputHendler = useCallback((id, value, isValid) => {
		dispatch({
			type: 'INPUT_CHANGED',
			inputId: id,
			value: value,
			isValid: isValid,
		});
	}, []);

	const setFormData = useCallback((inputData, formValidityData) => {
		dispatch({
			type: 'SET_DATA',
			inputs: inputData,
			formValidity: formValidityData,
		});
	}, []);

	return [formState, inputHendler, setFormData];
};
