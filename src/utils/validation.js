export const validateForm = (formData, requiredFields = []) => {
    const newErrors = {}

    requiredFields.forEach(fieldName => {
        const value = formData[fieldName]
        newErrors[fieldName] = validateSingleField(fieldName, value, formData);
    })

    return { errors: newErrors, isValid: Object.keys(newErrors).filter(key => newErrors[key] !== '').length === 0 };
}

const validateField = (value) => {
    if (!/^.{2,}$/.test(value)){
        return "Must be at least 2 characters.";
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

const validateSelect = (value) => {
    if (!value || value === '') {
        return "Please make a selection.";
    }
    return '';
};

const validatePrice = (value) => {
    if (!value || value === '') {
        return "Enter 0.00 if the event is free.";
    }
    return '';
};

const validateNumber = (value) => {
    if (!isNaN) {
        return "You must enter a number";
    }
    return '';
};

const validatePhoneNumber = (value) => {
    if (!/^(\+|00)?[1-9][\d\s\-\(\)]{7,17}$/.test(value)){
        return "You must enter a valid phone number.";
    }
    return '';
};

const validateCreditCardNumber = (value) => {
    if (!/^\d{13,19}$/.test(value)){
        return "You must enter a valid credit card number.";
    }
    return '';
};

const validateExpires = (value) => {
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)){
        return "You must enter a valid expiration date (MM/YY)";
    }
    return '';
};

const validateCVV = (value) => {
    if (!/^\d{3,4}$/.test(value)){
        return "You must enter a valid CVV code (3-4 digits).";
    }
    return '';
};

export const validateSingleField = (fieldName, value, formData = {}) => {
    const specialFields = {
        email: validateEmail,
        password: validatePassword,
        acceptTerms: validateAcceptTerms,
        categoryId: validateSelect,
        venueId: validateSelect,
        price: validatePrice,
        capacity: validateNumber,
        quantity: validateNumber,
        paymentMethodId: validateSelect,
        phoneNumber: validatePhoneNumber, 
        creditCardNumber: validateCreditCardNumber,
        expires: validateExpires,
        CVV: validateCVV
    };

    if (fieldName === 'confirmPassword') {
        return validateConfirmPassword(value, formData.password);
    } else if (specialFields[fieldName]) {
        return specialFields[fieldName](value);
    } else {
        return validateField(value);
    }
};