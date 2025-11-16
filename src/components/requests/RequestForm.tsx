import React, { useState } from 'react';
import { VENDOR_CATEGORIES } from '../../constants';
import { createEventRequest } from '../../services/requestService';
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const request = await createEventRequest({
      ...formState,
      guests: Number(formState.guests) || undefined,
      budgetMinAED: Number(formState.budgetMinAED) || undefined,
      budgetMaxAED: Number(formState.budgetMaxAED) || undefined,
      categoriesNeeded: formState.categoriesNeeded.length ? formState.categoriesNeeded : ['DJ']
    });
    onSuccess(request);
    setIsSubmitting(false);
    setFormState(initialState);
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
      <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="eventType" onChange={handleChange} placeholder="Event type" required value={formState.eventType} />
      <div className="grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="date" onChange={handleChange} placeholder="Date" type="date" value={formState.date} />
        <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="guests" onChange={handleChange} placeholder="Guest count" type="number" value={formState.guests ?? ''} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="budgetMinAED" onChange={handleChange} placeholder="Budget min" type="number" value={formState.budgetMinAED ?? ''} />
        <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="budgetMaxAED" onChange={handleChange} placeholder="Budget max" type="number" value={formState.budgetMaxAED ?? ''} />
      </div>
      <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="location" onChange={handleChange} placeholder="Location" required value={formState.location} />
      <textarea className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="notes" onChange={handleChange} placeholder="Notes" rows={4} value={formState.notes} />
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
