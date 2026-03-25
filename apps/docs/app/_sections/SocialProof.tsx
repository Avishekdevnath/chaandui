const stats = [
  { value: "3+", label: "Years building backend-first production systems" },
  { value: "10k+", label: "Students mentored in DSA and backend engineering" },
  { value: "500+", label: "Algorithm problems solved and taught" },
  { value: "14+", label: "Projects shipped across web, npm, and Python" }
];

const focusAreas = [
  "NestJS",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "Auth & RBAC",
  "System Design"
];

export function SocialProof() {
  return (
    <section>
      <div className="docs-container">
        <div className="home-proof-shell">
          <div className="home-proof-head">
            <p className="docs-label">Professional snapshot</p>
            <h2 className="home-proof-title">Backend systems, real users, long-term ownership.</h2>
            <p className="home-proof-lead">
              Avishek Devnath is a backend-focused software engineer who designs and maintains
              systems under real operational constraints, balancing scalability, security, and
              maintainability.
            </p>
          </div>

          <div className="home-proof-stats" role="list" aria-label="Career metrics">
            {stats.map((item) => (
              <article key={item.label} className="home-proof-stat" role="listitem">
                <p className="home-proof-value">{item.value}</p>
                <p className="home-proof-label">{item.label}</p>
              </article>
            ))}
          </div>

          <div className="home-logo-row" aria-label="Core focus areas">
            {focusAreas.map((item) => (
              <span key={item} className="home-logo-pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
