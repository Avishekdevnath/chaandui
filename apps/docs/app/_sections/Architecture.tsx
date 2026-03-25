const pillars = [
  {
    title: "System ownership, not ticket closure",
    body: "API contracts, versioning, and operational behavior are designed for long-term maintainability — not short-term patching."
  },
  {
    title: "Data integrity under growth",
    body: "Data modeling, migrations, and authorization are treated as first-class system concerns as traffic and requirements evolve."
  },
  {
    title: "Teach to deepen engineering clarity",
    body: "Mentoring 10,000+ students sharpened technical communication and fundamentals, improving architecture decisions in real projects."
  }
];

const checks = [
  "API design, contracts, and versioning",
  "Data modeling, migrations, and integrity",
  "Auth, RBAC, and secure workflows",
  "Background processing and async jobs",
  "Operational reliability and debugging",
  "Scalability-security-maintainability balance"
];

export function Architecture() {
  return (
    <section>
      <div className="docs-container home-arch-grid">
        <article className="home-arch-panel">
          <p className="docs-label">Backend-first systems</p>
          <h2 className="home-arch-title">Owned end-to-end under real constraints.</h2>
          <p className="home-arch-lead">
            Work spans internal and public-facing platforms including multi-tenant CRM systems,
            role-based student management, and consent-based biometric systems.
          </p>

          <div className="home-arch-list" role="list" aria-label="Engineering pillars">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="home-arch-item" role="listitem">
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </article>

        <aside className="home-check-panel" aria-label="Ownership checklist">
          <p className="docs-label" style={{ marginBottom: "0.7rem" }}>
            What gets owned
          </p>
          <ul>
            {checks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
