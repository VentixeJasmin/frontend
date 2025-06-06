import { useState } from 'react';
import { validateForm, validateSingleField } from '../utils/validation';

export const useFormValidation = (initialFormData) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const getRequiredFields = () => {
        const requiredInputs = document.querySelectorAll('input[required], select[required], textarea[required]');
        return Array.from(requiredInputs).map(input => input.name);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target; 
        setFormData(prev => ({
            ...prev, 
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const fieldError = validateSingleField(name, value, formData);
        setErrors(prev => ({
            ...prev,
            [name]: fieldError
        }));
    };

    const validateEntireForm = () => {
        const requiredFields = getRequiredFields();
        const validationResult = validateForm(formData, requiredFields);
        setErrors(validationResult.errors);
        return validationResult.isValid;
    };

    return {
        formData,
        errors,
        handleChange,
        handleBlur,
        validateEntireForm,
        setFormData,
        setErrors
    };
};