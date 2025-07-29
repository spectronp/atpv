
export const getIsValid = (inputName, validationResult) => !!validationResult[inputName]

export const getHelpText = (inputName, validationResult) => validationResult[inputName] ? validationResult[inputName][0] : ''
