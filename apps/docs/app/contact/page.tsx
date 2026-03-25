import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Avishek Devnath"
};

export default function ContactPage() {
  return (
    <main className="site-page-main">
      <section className="site-page-hero">
        <div className="docs-container">
          <p className="docs-label">Contact</p>
          <h1 className="site-page-title">Let’s connect and build something meaningful.</h1>
          <p className="site-page-lead">
            Open to opportunities in backend engineering, system design, and mentorship-focused
            technical roles.
          </p>
        </div>
      </section>

      <section>
        <div className="docs-container site-card-grid">
          <article className="site-card">
            <h2>Email</h2>
            <p>
              <a href="mailto:avishekdevnath@gmail.com">avishekdevnath@gmail.com</a>
            </p>
          </article>
          <article className="site-card">
            <h2>Phone</h2>
            <p>
              <a href="tel:+8801874819713">+8801874819713</a>
            </p>
          </article>
          <article className="site-card">
            <h2>Location</h2>
            <p>Dhaka, Bangladesh</p>
          </article>
          <article className="site-card">
            <h2>Profiles</h2>
            <p>
              <a href="https://github.com/Avishekdevnath">GitHub</a> ·{" "}
              <a href="https://www.linkedin.com/in/avishek-devnath-cse">LinkedIn</a> ·{" "}
              <a href="https://x.com/avishek_devnath">Twitter/X</a>
            </p>
          </article>
          <article className="site-card">
            <h2>Response Time</h2>
            <p>Usually within 24 hours.</p>
          </article>
          <article className="site-card">
            <h2>Hire profile</h2>
            <p>
              Explore details at{" "}
              <a href="https://www.avishekdevnath.com/hire-me">avishekdevnath.com/hire-me</a>
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
