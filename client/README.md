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

If you want recive data from field use "onInput={someHendler}", where onInput is required method and someHendler is function wich receives "id", "value" and result of validation. It is necessary to use react hook useCallback for preventing render loop

    const someHendler = useCallback((id, value, isValid) => {

    }, []);
