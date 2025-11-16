import React, { useState } from 'react';
import Layout from '../components/layout/Layout';

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
    setFormState(initialState);
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
          {submitted && <p className="mb-4 rounded-xl bg-green-500/20 px-4 py-2 text-sm text-green-300">Thanks! Our curation team will reach out within 48 hours.</p>}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="name" onChange={handleChange} placeholder="Full name" required value={formState.name} />
            <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="company" onChange={handleChange} placeholder="Company / agency" required value={formState.company} />
            <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="email" onChange={handleChange} placeholder="Work email" required type="email" value={formState.email} />
            <textarea className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="services" onChange={handleChange} placeholder="Describe your services" required rows={3} value={formState.services} />
            <input className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="averageBudget" onChange={handleChange} placeholder="Typical project value (AED)" value={formState.averageBudget} />
            <textarea className="rounded-2xl border border-white/15 bg-transparent px-4 py-3" name="certifications" onChange={handleChange} placeholder="Licenses, certifications, notable clients" rows={3} value={formState.certifications} />
            <button className="rounded-full bg-teal-400 px-6 py-3 font-semibold text-[#050507]" type="submit">
              Request onboarding
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default JoinVendorPage;
