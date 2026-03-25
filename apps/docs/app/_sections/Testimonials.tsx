const principles = [
  {
    quote: "Delivery is the floor, not the ceiling. I care about what happens after the PR merges.",
    name: "Own the system",
    role: "Engineering principle"
  },
  {
    quote:
      "Explaining to thousands of students forces real understanding. Teaching debugs your knowledge.",
    name: "Teach to understand",
    role: "Mentorship principle"
  },
  {
    quote:
      "Real systems run under constraints — time, infra, or team size. Constraints clarify decisions.",
    name: "Constraints clarify",
    role: "Execution principle"
  }
];

export function Testimonials() {
  return (
    <section>
      <div className="docs-container">
        <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
          Guiding principles
        </p>
        <h2 className="home-testimonial-title">How Avishek approaches engineering and growth.</h2>

        <div className="home-testimonial-grid" role="list" aria-label="Guiding principles">
          {principles.map((item) => (
            <blockquote key={item.name} className="home-testimonial-card" role="listitem">
              <p>“{item.quote}”</p>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
