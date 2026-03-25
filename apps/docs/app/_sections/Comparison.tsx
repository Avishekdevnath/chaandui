const rows = [
  {
    capability: "Accessibility defaults",
    chaand: "First-class keyboard/focus/semantics",
    generic: "Usually manual afterthought"
  },
  {
    capability: "Theme system",
    chaand: "11 presets + custom CSS color",
    generic: "Limited token flexibility"
  },
  {
    capability: "Monorepo adoption",
    chaand: "Package-scoped workflows",
    generic: "Single app assumptions"
  },
  {
    capability: "DX consistency",
    chaand: "Predictable props + patterns",
    generic: "Per-component variance"
  }
];

export function Comparison() {
  return (
    <section>
      <div className="docs-container">
        <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
          Platform advantage
        </p>
        <h2 className="home-compare-title">Why ChaandUI over generic kits?</h2>
        <p className="home-compare-lead">
          We optimize for real production delivery, not just pretty demos.
        </p>

        <div className="home-compare-table-wrap" role="region" aria-label="ChaandUI comparison table">
          <table className="home-compare-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>ChaandUI</th>
                <th>Typical UI kit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.capability}>
                  <td>{row.capability}</td>
                  <td>{row.chaand}</td>
                  <td>{row.generic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
