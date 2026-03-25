const features = [
  {
    icon: "◉",
    label: "11 Accent Presets",
    desc: "Named color system + any CSS color"
  },
  {
    icon: "⬡",
    label: "6 Layout Variants",
    desc: "Cinema, pill, floating, minimal + more"
  },
  {
    icon: "◎",
    label: "Accessible by Default",
    desc: "Keyboard nav, semantics, and contrast-aware surfaces"
  },
  {
    icon: "❋",
    label: "Composable API",
    desc: "Primitives-first architecture with predictable props"
  },
  {
    icon: "⬘",
    label: "Zero CSS-in-JS Runtime",
    desc: "Token-driven CSS with clean runtime behavior"
  },
  {
    icon: "⟳",
    label: "Monorepo Friendly",
    desc: "Package-scoped validation and incremental adoption"
  }
];

export function FeatureBar() {
  return (
    <section>
      <div className="docs-container">
        <div className="docs-feature-header">
          <p className="docs-label">Why teams ship with ChaandUI</p>
          <h2 className="docs-feature-title">Publish-ready foundations from day one.</h2>
          <p className="docs-feature-lead">
            Built for production workflows with clear APIs, accessible interactions, and scalable
            composition.
          </p>
        </div>

        <div className="docs-feature-grid" role="list" aria-label="ChaandUI platform highlights">
          {features.map((feature) => (
            <article key={feature.label} className="docs-feature-card" role="listitem">
              <span className="docs-feature-icon" aria-hidden>
                {feature.icon}
              </span>
              <h3 className="docs-feature-name">{feature.label}</h3>
              <p className="docs-feature-description">{feature.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
