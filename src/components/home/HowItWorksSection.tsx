import React from 'react';
import { HOW_IT_WORKS_STEPS } from '../../constants';

const HowItWorksSection: React.FC = () => (
  <section id="how-it-works">
    <p className="text-sm uppercase tracking-[0.3em] text-white/60">How it works</p>
    <h2 className="mt-4 text-3xl font-semibold">Structured like an agency, automated by AI.</h2>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {HOW_IT_WORKS_STEPS.map((step, index) => (
        <article key={step.title} className="rounded-2xl border border-white/15 bg-white/5 p-6">
          <span className="text-sm text-white/60">Step {index + 1}</span>
          <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
          <p className="mt-2 text-white/70">{step.description}</p>
        </article>
      ))}
    </div>
  </section>
);

export default HowItWorksSection;
