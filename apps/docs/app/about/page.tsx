import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Avishek Devnath"
};

export default function AboutPage() {
  return (
    <main className="site-page-main">
      <section className="site-page-hero">
        <div className="docs-container">
          <p className="docs-label">About</p>
          <h1 className="site-page-title">Backend-first systems, owned end-to-end.</h1>
          <p className="site-page-lead">
            Avishek Devnath is a backend-focused software engineer building systems under real
            operational constraints — from APIs and data models to auth, RBAC, and background
            processing.
          </p>
        </div>
      </section>

      <section>
        <div className="docs-container site-card-grid">
          <article className="site-card">
            <h2>Inspiration story</h2>
            <p>
              Teaching 10,000+ students in DSA and backend development shaped a practical approach:
              clarity first, fundamentals strong, and long-term ownership over short-term delivery.
            </p>
          </article>
          <article className="site-card">
            <h2>Professional journey</h2>
            <p>
              Work includes internal and public-facing systems such as multi-tenant CRM, role-based
              student management, and consent-based offline biometric platforms.
            </p>
          </article>
          <article className="site-card">
            <h2>Academic foundation</h2>
            <p>
              BSc in CSE from BGC Trust University Bangladesh and currently pursuing an MSc in CSE
              at the University of Dhaka.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
