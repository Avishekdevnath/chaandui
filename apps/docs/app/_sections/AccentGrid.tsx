const accents = [
  { name: "default", color: "#f64f59" },
  { name: "primary", color: "#5f7cff" },
  { name: "danger", color: "#ef4444" },
  { name: "success", color: "#22c55e" },
  { name: "warning", color: "#f59e0b" },
  { name: "info", color: "#3b82f6" },
  { name: "rose", color: "#f43f5e" },
  { name: "violet", color: "#8b5cf6" },
  { name: "amber", color: "#f59e0b" },
  { name: "teal", color: "#14b8a6" },
  { name: "sky", color: "#0ea5e9" }
];

export function AccentGrid() {
  return (
    <section>
      <div className="docs-container">
        <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
          Accent System
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "0.75rem"
          }}
        >
          11 named presets. Any CSS color.
        </h2>
        <p
          style={{
            color: "rgba(250,250,250,0.5)",
            marginBottom: "2.5rem",
            maxWidth: "36rem"
          }}
        >
          Use a preset for consistency or pass any CSS color for rapid visual
          experimentation while keeping the same API.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))",
            gap: "0.75rem"
          }}
        >
          {accents.map((accent) => (
            <article
              key={accent.name}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.625rem",
                padding: "1rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "0.75rem"
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "3/1",
                  borderRadius: "0.375rem",
                  background: `linear-gradient(135deg, ${accent.color}, color-mix(in srgb, ${accent.color} 60%, #000))`
                }}
              />
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "rgba(250,250,250,0.6)",
                  textTransform: "capitalize"
                }}
              >
                {accent.name}
              </span>
              <code
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "var(--docs-font-mono)",
                  color: "rgba(250,250,250,0.3)"
                }}
              >
                {accent.color}
              </code>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
