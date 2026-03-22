import React, { useState } from 'react';
import { VENDOR_CATEGORIES } from '../../constants';
import { createEventRequest } from '../../services/requestService';
import { validators } from '../../lib/validation';
import type { EventRequest, VendorCategory } from '../../types';

interface RequestFormProps {
  onSuccess: (request: EventRequest) => void;
}

const initialState: Omit<EventRequest, 'id'> = {
  eventType: '',
  date: '',
  guests: undefined,
  budgetMinAED: undefined,
  budgetMaxAED: undefined,
  location: '',
  notes: '',
  categoriesNeeded: []
};

const RequestForm: React.FC<RequestFormProps> = ({ onSuccess }) => {
  const [formState, setFormState] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validate event type
    const eventTypeError = validators.name(formState.eventType, 'eventType');
    if (eventTypeError) newErrors[eventTypeError.field] = eventTypeError.message;

    // Validate location
    const locationError = validators.name(formState.location, 'location');
    if (locationError) newErrors[locationError.field] = locationError.message;

    // Validate date
    const dateError = validators.date(formState.date, 'date');
    if (dateError) newErrors[dateError.field] = dateError.message;

    // Validate guests
    const guestsError = validators.guests(formState.guests ? Number(formState.guests) : undefined);
    if (guestsError) newErrors[guestsError.field] = guestsError.message;

    // Validate budget
    const budgetError = validators.budget(
      formState.budgetMinAED ? Number(formState.budgetMinAED) : undefined,
      formState.budgetMaxAED ? Number(formState.budgetMaxAED) : undefined
    );
    if (budgetError) newErrors[budgetError.field] = budgetError.message;

    // Validate notes
    const notesError = validators.description(formState.notes, 'notes');
    if (notesError) newErrors[notesError.field] = notesError.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const request = await createEventRequest({
        ...formState,
        guests: formState.guests ? Number(formState.guests) : undefined,
        budgetMinAED: formState.budgetMinAED ? Number(formState.budgetMinAED) : undefined,
        budgetMaxAED: formState.budgetMaxAED ? Number(formState.budgetMaxAED) : undefined,
        categoriesNeeded: formState.categoriesNeeded.length ? formState.categoriesNeeded : ['DJ']
      });
      onSuccess(request);
      setFormState(initialState);
      setErrors({});
    } catch (error) {
      console.error('Error creating request:', error);
      setErrors({ submit: 'Failed to submit request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleCategory = (categoryId: VendorCategory) => {
    setFormState(prev => {
      const exists = prev.categoriesNeeded.includes(categoryId);
      return {
        ...prev,
        categoriesNeeded: exists
          ? prev.categoriesNeeded.filter(category => category !== categoryId)
          : [...prev.categoriesNeeded, categoryId]
      };
    });
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {errors.submit && (
        <div className="rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-300">
          {errors.submit}
        </div>
      )}
      
      <div>
        <input 
          className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.eventType ? 'border-red-400' : 'border-white/15'}`}
          name="eventType" 
          onChange={handleChange} 
          placeholder="Event type" 
          required 
          value={formState.eventType} 
        />
        {errors.eventType && <p className="mt-1 text-xs text-red-300">{errors.eventType}</p>}
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input 
            className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.date ? 'border-red-400' : 'border-white/15'}`}
            name="date" 
            onChange={handleChange} 
            placeholder="Date" 
            type="date" 
            value={formState.date} 
          />
          {errors.date && <p className="mt-1 text-xs text-red-300">{errors.date}</p>}
        </div>
        <div>
          <input 
            className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.guests ? 'border-red-400' : 'border-white/15'}`}
            name="guests" 
            onChange={handleChange} 
            placeholder="Guest count" 
            type="number" 
            min="1"
            value={formState.guests ?? ''} 
          />
          {errors.guests && <p className="mt-1 text-xs text-red-300">{errors.guests}</p>}
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <input 
            className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.budgetMinAED ? 'border-red-400' : 'border-white/15'}`}
            name="budgetMinAED" 
            onChange={handleChange} 
            placeholder="Budget min (AED)" 
            type="number" 
            min="0"
            value={formState.budgetMinAED ?? ''} 
          />
          {errors.budgetMinAED && <p className="mt-1 text-xs text-red-300">{errors.budgetMinAED}</p>}
        </div>
        <div>
          <input 
            className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.budgetMaxAED ? 'border-red-400' : 'border-white/15'}`}
            name="budgetMaxAED" 
            onChange={handleChange} 
            placeholder="Budget max (AED)" 
            type="number" 
            min="0"
            value={formState.budgetMaxAED ?? ''} 
          />
          {errors.budgetMaxAED && <p className="mt-1 text-xs text-red-300">{errors.budgetMaxAED}</p>}
        </div>
      </div>
      
      <div>
        <input 
          className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.location ? 'border-red-400' : 'border-white/15'}`}
          name="location" 
          onChange={handleChange} 
          placeholder="Location" 
          required 
          value={formState.location} 
        />
        {errors.location && <p className="mt-1 text-xs text-red-300">{errors.location}</p>}
      </div>
      
      <div>
        <textarea 
          className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.notes ? 'border-red-400' : 'border-white/15'}`}
          name="notes" 
          onChange={handleChange} 
          placeholder="Notes" 
          rows={4} 
          value={formState.notes} 
        />
        {errors.notes && <p className="mt-1 text-xs text-red-300">{errors.notes}</p>}
      </div>
      <div>
        <p className="text-sm text-white/60">Needed services</p>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {VENDOR_CATEGORIES.map(category => (
            <button
              key={category.id}
              className={`rounded-full border px-3 py-1 ${formState.categoriesNeeded.includes(category.id) ? 'border-teal-300 text-teal-200' : 'border-white/20 text-white/60'}`}
              onClick={event => {
                event.preventDefault();
                handleToggleCategory(category.id);
              }}
              type="button"
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>
      <button className="rounded-full bg-white px-6 py-3 font-semibold text-[#050507]" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : 'Submit brief'}
      </button>
    </form>
  );
};

export default RequestForm;
