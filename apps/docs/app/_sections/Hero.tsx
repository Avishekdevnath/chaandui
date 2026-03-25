"use client";

import { useState } from "react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const installCmd = "npm install @chaandui/react @chaandui/styles";

  async function copy() {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section
      style={{
        paddingTop: "clamp(5rem, 12vw, 10rem)",
        paddingBottom: "clamp(3rem, 6vw, 5rem)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, color-mix(in srgb, #f64f59 18%, transparent), transparent)",
          pointerEvents: "none"
        }}
      />

      <div className="docs-container" style={{ position: "relative", zIndex: 1 }}>
        <p className="docs-label" style={{ marginBottom: "1.25rem" }}>
          ChaandUI
        </p>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
            background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,0.55))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}
        >
          Beautiful UI
          <br />
          built for scale.
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "rgba(250,250,250,0.55)",
            maxWidth: "40rem",
            marginInline: "auto",
            lineHeight: 1.65,
            marginBottom: "3rem"
          }}
        >
          Aesthetic, accessible React components with an advanced accent theming
          system. Drop-in ready and scalable from startup MVP to enterprise
          design systems.
        </p>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.75rem",
            padding: "0.75rem 1.25rem",
            marginBottom: "2rem",
            cursor: "pointer"
          }}
          onClick={copy}
          role="button"
          aria-label="Copy install command"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              void copy();
            }
          }}
        >
          <code
            style={{
              fontFamily: "var(--docs-font-mono)",
              fontSize: "0.875rem",
              color: "rgba(250,250,250,0.8)"
            }}
          >
            {installCmd}
          </code>
          <span
            style={{
              fontSize: "0.7rem",
              color: copied ? "#4ade80" : "rgba(250,250,250,0.35)",
              fontWeight: 600,
              minWidth: "2.5rem"
            }}
          >
            {copied ? "Copied!" : "Copy"}
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.875rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            className="docs-hero-cta"
            href="/docs"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#f64f59",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "0.8rem 1.5rem",
              borderRadius: "0.6rem",
              textDecoration: "none",
              minHeight: "44px"
            }}
          >
            Get Started →
          </a>
          <a
            className="docs-hero-cta"
            href="https://github.com/your-org/chaandui"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(250,250,250,0.8)",
              fontWeight: 600,
              fontSize: "0.9rem",
              padding: "0.8rem 1.5rem",
              borderRadius: "0.6rem",
              textDecoration: "none",
              minHeight: "44px"
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
