import { useState, useCallback } from 'react';

export interface ValidationRule {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

export interface FormField {
  value: string;
  error: string | null;
  touched: boolean;
}

export interface FormState {
  [key: string]: FormField;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

const validateField = (value: string, rules: ValidationRule): string | null => {
  if (rules.required && !value.trim()) {
    return 'This field is required';
  }

  if (value && rules.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
  }

  if (value && rules.minLength && value.length < rules.minLength) {
    return `Must be at least ${rules.minLength} characters`;
  }

  if (value && rules.maxLength && value.length > rules.maxLength) {
    return `Must be no more than ${rules.maxLength} characters`;
  }

  if (value && rules.pattern && !rules.pattern.test(value)) {
    return 'Invalid format';
  }

  if (value && rules.custom) {
    return rules.custom(value);
  }

  return null;
};

export const useFormValidation = (initialState: FormState, validationRules: ValidationRules) => {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((fieldName: string, value: string) => {
    setFormState(prev => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        error: validateField(value, validationRules[fieldName] || {}),
        touched: true,
      },
    }));
  }, [validationRules]);

  const validateForm = useCallback(() => {
    const newFormState = { ...formState };
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const field = newFormState[fieldName];
      if (field) {
        const error = validateField(field.value, validationRules[fieldName]);
        newFormState[fieldName] = {
          ...field,
          error,
          touched: true,
        };
        if (error) {
          isValid = false;
        }
      }
    });

    setFormState(newFormState);
    return isValid;
  }, [formState, validationRules]);

  const resetForm = useCallback(() => {
    const resetState: FormState = {};
    Object.keys(formState).forEach(key => {
      resetState[key] = {
        value: '',
        error: null,
        touched: false,
      };
    });
    setFormState(resetState);
    setIsSubmitting(false);
  }, [formState]);

  const getFieldProps = useCallback((fieldName: string) => {
    const field = formState[fieldName];
    return {
      value: field?.value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        updateField(fieldName, e.target.value),
      onBlur: () => {
        if (field && !field.touched) {
          setFormState(prev => ({
            ...prev,
            [fieldName]: {
              ...prev[fieldName],
              touched: true,
            },
          }));
        }
      },
      error: field?.error,
      hasError: !!(field?.error && field?.touched),
    };
  }, [formState, updateField]);

  return {
    formState,
    updateField,
    validateForm,
    resetForm,
    getFieldProps,
    isSubmitting,
    setIsSubmitting,
  };
};
