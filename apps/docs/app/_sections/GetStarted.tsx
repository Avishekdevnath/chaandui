"use client";

import { useState } from "react";

const steps = [
  {
    step: "1",
    title: "Install",
    code: "npm install @chaandui/react @chaandui/styles"
  },
  {
    step: "2",
    title: "Import styles",
    code: "import \"@chaandui/styles\";"
  },
  {
    step: "3",
    title: "Use a component",
    code: `import { Button } from "@chaandui/react";

export function App() {
  return <Button tone="primary">Launch</Button>;
}`
  }
];

export function GetStarted() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(steps[active].code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section>
      <div className="docs-container">
        <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
          Quick Start
        </p>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "3rem"
          }}
        >
          Up in 3 steps.
        </h2>

        <div className="docs-step-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {steps.map((item, index) => {
              const isActive = active === index;

              return (
                <button
                  className="docs-step-button"
                  key={item.step}
                  onClick={() => setActive(index)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1rem 1.25rem",
                    background: isActive ? "rgba(246,79,89,0.1)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? "rgba(246,79,89,0.3)" : "rgba(255,255,255,0.07)"}`,
                    borderRadius: "0.75rem",
                    textAlign: "left",
                    cursor: "pointer",
                    color: "inherit",
                    minHeight: "44px"
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      width: "1.75rem",
                      height: "1.75rem",
                      borderRadius: "9999px",
                      background: isActive ? "#f64f59" : "rgba(255,255,255,0.08)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      color: isActive ? "#fff" : "rgba(250,250,250,0.5)"
                    }}
                  >
                    {item.step}
                  </span>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.title}</span>
                </button>
              );
            })}
          </div>

          <div className="docs-code-panel">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderBottom: "1px solid rgba(255,255,255,0.07)"
              }}
            >
              <span style={{ fontSize: "0.75rem", color: "rgba(250,250,250,0.4)" }}>
                {steps[active].title}
              </span>
              <button
                onClick={copy}
                style={{
                  fontSize: "0.7rem",
                  color: copied ? "#4ade80" : "rgba(250,250,250,0.4)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                  minHeight: "32px"
                }}
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre
              style={{
                padding: "1.25rem",
                fontFamily: "var(--docs-font-mono)",
                fontSize: "0.8rem",
                lineHeight: 1.7,
                color: "rgba(250,250,250,0.8)",
                overflowX: "auto",
                margin: 0
              }}
            >
              <code>{steps[active].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
