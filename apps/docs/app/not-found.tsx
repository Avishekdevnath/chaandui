export default function NotFoundPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        padding: "2rem"
      }}
    >
      <section
        style={{
          textAlign: "center",
          maxWidth: "36rem",
          width: "100%",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "0.75rem",
          padding: "2rem",
          background: "rgba(255,255,255,0.02)"
        }}
      >
        <p className="docs-label" style={{ marginBottom: "0.75rem" }}>
          404
        </p>
        <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", marginBottom: "0.75rem" }}>
          Page not found
        </h1>
        <p style={{ color: "rgba(250,250,250,0.55)", marginBottom: "1.5rem" }}>
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "44px",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.6rem",
            textDecoration: "none",
            background: "#f64f59",
            color: "#fff",
            fontWeight: 600
          }}
        >
          Back to home
        </a>
      </section>
    </main>
  );
}
