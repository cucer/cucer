import type { CSSProperties } from 'react';
import RevealCard from './RevealCard';

/* Each node lights up as the rail pulse reaches it; the delays are fractions of
   the 4.2s aiPulseTravel cycle in globals.css. */
const PIPELINE_STEPS = ['Prompt', 'Retrieval', 'Model', 'Tools', 'Product'];
const STEP_DELAY_MS = 460;

const AI_CARDS = [
  {
    title: 'LLM integration',
    body: 'Claude, ChatGPT, and Gemini wired into existing apps, with streaming responses, tool calls, and sensible cost controls.',
  },
  {
    title: 'Retrieval & RAG',
    body: 'Document ingestion, embeddings, and vector search so answers are grounded in your own data instead of guesswork.',
  },
  {
    title: 'Self-hosted models',
    body: 'Private LLM setups for teams whose data cannot leave their own infrastructure, sized to the hardware you actually have.',
  },
  {
    title: 'Agents & automation',
    body: 'Multi-step agents that call your APIs and move real work forward, with evaluation loops to keep them honest.',
  },
];

export default function AiSection() {
  return (
    <section id="ai" className="ai-band">
      <div className="ai-glow" aria-hidden="true"></div>

      <div className="section-intro">
        <h2 className="eyebrow">AI Integration</h2>
        <p className="lede">
          I put language models into products that already have users, along with the
          retrieval, tooling, and guardrails that keep them useful once real traffic
          arrives.
        </p>
      </div>

      <ol className="ai-pipeline">
        {PIPELINE_STEPS.map((step, index) => (
          <li className="ai-step" key={step}>
            <span
              className="ai-dot"
              aria-hidden="true"
              style={
                { '--ai-step-delay': `${index * STEP_DELAY_MS}ms` } as CSSProperties
              }
            ></span>
            <span className="ai-step-label">{step}</span>
          </li>
        ))}
      </ol>

      <div className="ai-grid">
        {AI_CARDS.map((card, index) => (
          <RevealCard className="ai-card" index={index} key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
          </RevealCard>
        ))}
      </div>
    </section>
  );
}
