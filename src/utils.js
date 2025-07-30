
export const getIsValid = (inputName, validationResult) => !!validationResult[inputName]

export const getHelpText = (inputName, validationResult) => validationResult[inputName] ? validationResult[inputName][0] : ''

export const validate = (input, setInput, type) => {
    const result = type.safeParse(input)
    if(!result.success) return 

    setInput(input)
}
