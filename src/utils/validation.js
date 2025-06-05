export const validateForm = (formData, requiredFields = []) => {
    const newErrors = {}

    requiredFields.forEach(fieldName => {
        const value = formData[fieldName]
        newErrors[fieldName] = validateSingleField(fieldName, value, formData);
    })

    return { errors: newErrors, isValid: Object.keys(newErrors).filter(key => newErrors[key] !== '').length === 0 };
}

const validateField = (value) => {
    if (!/^[A-Öa-ö\s\-]{2,}$/.test(value)){
        return "Must be at least 2 letters.";
    }
    return '';
}

const validatePassword = (value) => {
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)){
        return "Password must contain at least 8 characters, one uppercase, one lowercase, one digit and one special character."
    }
    return '';
}

const validateConfirmPassword = (confirmPassword, password) => {
    if (confirmPassword !== password){
        return "Passwords do not match.";
    }
    return '';
}

const validateEmail = (value) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
        return "You must enter a valid email address.";
    }
    return '';
}

const validateAcceptTerms = (value) => {
    if (value === false){
        return "You must accept the terms and conditions.";
    }
    return '';
}

export const validateSingleField = (fieldName, value, formData = {}) => {
    const specialFields = {
        email: validateEmail,
        password: validatePassword,
        acceptTerms: validateAcceptTerms
    };

    if (fieldName === 'confirmPassword') {
        return validateConfirmPassword(value, formData.password);
    } else if (specialFields[fieldName]) {
        return specialFields[fieldName](value);
    } else {
        return validateField(value);
    }
};