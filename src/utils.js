export const isValid = async (value, schema) => {
    try {
        await schema.validate(value)
    } catch (err) {
        return false
    }
    return true
}

export const handleInput = async (value, setInput, schema) => {
    if((await isValid(value, schema) || value == "")) setInput(value)
}

export const parseValue = async (value, schema) => {
    let parsed
    try {
        parsed = await schema.cast(value)
    } catch(err) {
        return {success: false, error: err}
    }
    return {success: true, data: parsed}
}
