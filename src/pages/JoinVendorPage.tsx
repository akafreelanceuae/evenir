import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { vendorSignupStorage } from '../lib/storage';
import { validators } from '../lib/validation';

interface VendorSignupState {
  name: string;
  company: string;
  email: string;
  services: string;
  averageBudget: string;
  certifications: string;
}

const initialState: VendorSignupState = {
  name: '',
  company: '',
  email: '',
  services: '',
  averageBudget: '',
  certifications: ''
};

const JoinVendorPage: React.FC = () => {
  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Validate name
    const nameError = validators.name(formState.name, 'name');
    if (nameError) newErrors[nameError.field] = nameError.message;

    // Validate company
    const companyError = validators.name(formState.company, 'company');
    if (companyError) newErrors[companyError.field] = companyError.message;

    // Validate email
    const emailError = validators.email(formState.email);
    if (emailError) newErrors[emailError.field] = emailError.message;

    // Validate services
    const servicesError = validators.description(formState.services, 'services');
    if (servicesError) newErrors[servicesError.field] = servicesError.message;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      vendorSignupStorage.add({
        name: formState.name,
        company: formState.company,
        email: formState.email,
        services: formState.services,
        averageBudget: formState.averageBudget,
        certifications: formState.certifications
      });
      setSubmitted(true);
      setFormState(initialState);
      setErrors({});
      
      // Reset submitted state after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting vendor signup:', error);
      setErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <section>
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">Vendors</p>
        <h1 className="mt-4 text-4xl font-semibold">Join the Evenir roster</h1>
        <p className="mt-2 max-w-3xl text-white/70">We champion boutique teams and established production houses who obsess over detail. Apply once—after verification you’ll receive vetted briefs with clear budgets.</p>
      </section>
      <section className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Why vendors join</h2>
          <ul className="mt-4 space-y-3 text-white/70">
            <li>• Crystal-clear briefs and consolidated messaging.</li>
            <li>• Concierge support to qualify every lead.</li>
            <li>• Fast payouts with milestone-based invoicing.</li>
          </ul>
          <div className="mt-6 rounded-2xl bg-[#080810] p-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Onboarding steps</p>
            <ol className="mt-3 space-y-2 text-white/80">
              <li><strong>Step 1: Account</strong> — share contact + legal entity.</li>
              <li><strong>Step 2: Profile</strong> — upload services, starting rates, galleries.</li>
              <li><strong>Step 3: Compliance</strong> — trade license + insurance review.</li>
            </ol>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold">Submit your profile</h2>
          {submitted && (
            <p className="mb-4 rounded-xl bg-green-500/20 px-4 py-2 text-sm text-green-300">
              Thanks! Our curation team will reach out within 48 hours.
            </p>
          )}
          {errors.submit && (
            <p className="mb-4 rounded-xl bg-red-500/20 px-4 py-2 text-sm text-red-300">
              {errors.submit}
            </p>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <input 
                className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.name ? 'border-red-400' : 'border-white/15'}`}
                name="name" 
                onChange={handleChange} 
                placeholder="Full name" 
                required 
                value={formState.name} 
              />
              {errors.name && <p className="mt-1 text-xs text-red-300">{errors.name}</p>}
            </div>
            <div>
              <input 
                className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.company ? 'border-red-400' : 'border-white/15'}`}
                name="company" 
                onChange={handleChange} 
                placeholder="Company / agency" 
                required 
                value={formState.company} 
              />
              {errors.company && <p className="mt-1 text-xs text-red-300">{errors.company}</p>}
            </div>
            <div>
              <input 
                className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.email ? 'border-red-400' : 'border-white/15'}`}
                name="email" 
                onChange={handleChange} 
                placeholder="Work email" 
                required 
                type="email" 
                value={formState.email} 
              />
              {errors.email && <p className="mt-1 text-xs text-red-300">{errors.email}</p>}
            </div>
            <div>
              <textarea 
                className={`rounded-2xl border bg-transparent px-4 py-3 ${errors.services ? 'border-red-400' : 'border-white/15'}`}
                name="services" 
                onChange={handleChange} 
                placeholder="Describe your services" 
                required 
                rows={3} 
                value={formState.services} 
              />
              {errors.services && <p className="mt-1 text-xs text-red-300">{errors.services}</p>}
            </div>
            <input 
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" 
              name="averageBudget" 
              onChange={handleChange} 
              placeholder="Typical project value (AED)" 
              type="number"
              min="0"
              value={formState.averageBudget} 
            />
            <textarea 
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" 
              name="certifications" 
              onChange={handleChange} 
              placeholder="Licenses, certifications, notable clients" 
              rows={3} 
              value={formState.certifications} 
            />
            <button 
              className="rounded-full bg-teal-400 px-6 py-3 font-semibold text-[#050507] disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request onboarding'}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default JoinVendorPage;
