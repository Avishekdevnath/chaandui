const faqs = [
  {
    question: "How soon can we start working together?",
    answer:
      "Typically quickly after scope alignment. You can share the role or project details through email or social channels."
  },
  {
    question: "What is your communication style?",
    answer:
      "Clear, practical, and documentation-friendly communication focused on decisions, trade-offs, and delivery visibility."
  },
  {
    question: "Do you provide handover and mentoring support?",
    answer:
      "Yes. Knowledge transfer, mentoring, and handover are part of the workflow when needed."
  }
];

export function FaqAndCta() {
  return (
    <section>
      <div className="docs-container home-faq-wrap">
        <div className="home-faq-panel">
          <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
            FAQ
          </p>
          <h2 className="home-faq-title">Common questions about working together.</h2>
          <div className="home-faq-list">
            {faqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="home-final-cta">
          <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
            Hire me
          </p>
          <h3>Interested in backend engineering support?</h3>
          <p>
            Open to opportunities in backend-focused software engineering, system design, and
            mentorship-heavy technical roles.
          </p>
          <div className="home-final-actions">
            <a href="mailto:avishekdevnath@gmail.com">Email me</a>
            <a href="https://www.avishekdevnath.com/hire-me" className="secondary">
              View hire profile
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
