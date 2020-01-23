## Available Shared Components

### Input

| Property     | Description                                              | Values                                                                                                                                    |
| ------------ | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| id           | id of element                                            | should provide info about data in field                                                                                                   |
| type         | change view of field                                     | "input", "texarea", "password"                                                                                                            |
| label        | provides text for label above field                      | short description of field                                                                                                                |
| className    | adds name of class for field                             | ANY                                                                                                                                       |
| validations  | add validators(array) to data from field,                | "VAL_REQUIRED()", "VAL_EMAIL()", "VAL_LETTERS()", "VAL_PHONE()" - not implemented yet, "VAL_MIN_LENGTH(number)", "VAL_MAX_LENGTH(number)" |
| errorMessage | add message below field wich shows after fail validation | ANY                                                                                                                                       |
|              |                                                          |                                                                                                                                           |

If you want recive data from field use "onInput={someHandler}", where onInput is required method and someHendler is function wich receives "id", "value" and result of validation. It is necessary to use react hook useCallback for preventing render loop

    const someHandler = useCallback((id, value, isValid) => {

    }, []);

Or you can use custom form hook by "import { useForm }" from folder "src/shared/hooks/useForm.js". To use it in your form add this lines:

    const [formState, someHandler, setFormData] = useForm(
    	{
    		email: {
    			value: '',
    			isValid: false,
    		},
            // here you declare initial fields you need in state
            // It is optional
            //Names must be the same as id of your Input component
    	},
    	false //this is initial state of form validity
    );

- formState is variable which contains state with all your Input data.
- someHandler is the same function as before but implemented in this hook.
- setFormData is function wich can add new fields to state. It is optional.
