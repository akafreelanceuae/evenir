import { VALIDATION } from './constants';

export interface ValidationError {
  field: string;
  message: string;
}

export const validators = {
  email: (email: string): ValidationError | null => {
    if (!email.trim()) {
      return { field: 'email', message: 'Email is required' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { field: 'email', message: 'Please enter a valid email address' };
    }
    return null;
  },

  name: (name: string, fieldName = 'name'): ValidationError | null => {
    if (!name.trim()) {
      return { field: fieldName, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` };
    }
    if (name.trim().length < VALIDATION.MIN_NAME_LENGTH) {
      return { field: fieldName, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${VALIDATION.MIN_NAME_LENGTH} characters` };
    }
    if (name.trim().length > VALIDATION.MAX_NAME_LENGTH) {
      return { field: fieldName, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${VALIDATION.MAX_NAME_LENGTH} characters` };
    }
    return null;
  },

  description: (description: string, fieldName = 'description'): ValidationError | null => {
    if (!description.trim()) {
      return { field: fieldName, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required` };
    }
    if (description.trim().length < VALIDATION.MIN_DESCRIPTION_LENGTH) {
      return { field: fieldName, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${VALIDATION.MIN_DESCRIPTION_LENGTH} characters` };
    }
    if (description.trim().length > VALIDATION.MAX_DESCRIPTION_LENGTH) {
      return { field: fieldName, message: `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${VALIDATION.MAX_DESCRIPTION_LENGTH} characters` };
    }
    return null;
  },

  guests: (guests: number | undefined): ValidationError | null => {
    if (guests === undefined) return null;
    if (isNaN(guests) || guests < VALIDATION.MIN_GUESTS) {
      return { field: 'guests', message: `Guest count must be at least ${VALIDATION.MIN_GUESTS}` };
    }
    if (guests > VALIDATION.MAX_GUESTS) {
      return { field: 'guests', message: `Guest count cannot exceed ${VALIDATION.MAX_GUESTS}` };
    }
    return null;
  },

  budget: (min: number | undefined, max: number | undefined): ValidationError | null => {
    if (min !== undefined) {
      if (isNaN(min) || min < VALIDATION.MIN_BUDGET) {
        return { field: 'budgetMinAED', message: `Minimum budget must be at least AED ${VALIDATION.MIN_BUDGET}` };
      }
      if (min > VALIDATION.MAX_BUDGET) {
        return { field: 'budgetMinAED', message: `Minimum budget cannot exceed AED ${VALIDATION.MAX_BUDGET.toLocaleString()}` };
      }
    }
    if (max !== undefined) {
      if (isNaN(max) || max < VALIDATION.MIN_BUDGET) {
        return { field: 'budgetMaxAED', message: `Maximum budget must be at least AED ${VALIDATION.MIN_BUDGET}` };
      }
      if (max > VALIDATION.MAX_BUDGET) {
        return { field: 'budgetMaxAED', message: `Maximum budget cannot exceed AED ${VALIDATION.MAX_BUDGET.toLocaleString()}` };
      }
    }
    if (min !== undefined && max !== undefined && min > max) {
      return { field: 'budgetMaxAED', message: 'Maximum budget must be greater than minimum budget' };
    }
    return null;
  },

  date: (date: string | undefined, fieldName = 'date'): ValidationError | null => {
    if (!date) return null;
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (isNaN(selectedDate.getTime())) {
      return { field: fieldName, message: 'Please enter a valid date' };
    }
    if (selectedDate < today) {
      return { field: fieldName, message: 'Event date cannot be in the past' };
    }
    return null;
  }
};

