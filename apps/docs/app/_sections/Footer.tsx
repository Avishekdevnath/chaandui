const links = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/docs/components" },
  { label: "Storybook", href: "http://localhost:6006" },
  { label: "GitHub", href: "https://github.com/your-org/chaandui" },
  { label: "npm", href: "https://npmjs.com/org/chaandui" },
  { label: "Changelog", href: "/docs/changelog" }
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "2.5rem 0"
      }}
    >
      <div
        className="docs-container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          alignItems: "center",
          textAlign: "center"
        }}
      >
        <p className="docs-label">ChaandUI</p>

        <nav style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: "0.85rem",
                color: "rgba(250,250,250,0.45)",
                textDecoration: "none"
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p style={{ fontSize: "0.75rem", color: "rgba(250,250,250,0.2)" }}>
          Built with ChaandUI.
        </p>
      </div>
    </footer>
  );
}
