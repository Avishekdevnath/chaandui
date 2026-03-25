import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docs — ChaandUI"
};

const upcoming = [
  "Component API reference",
  "Theme tokens and accent recipes",
  "Migration and version upgrade guides",
  "Interactive examples and playground snippets"
];

export default function DocsPage() {
  return (
    <main className="site-page-main">
      <section className="site-page-hero">
        <div className="docs-container">
          <p className="docs-label">Docs</p>
          <h1 className="site-page-title">Documentation is coming soon.</h1>
          <p className="site-page-lead">
            We’re shaping a polished docs experience with practical guides, API depth, and glimmery
            previews.
          </p>
        </div>
      </section>

      <section>
        <div className="docs-container">
          <article className="docs-coming-card">
            <div className="docs-coming-glimmer" aria-hidden />
            <h2>On the way</h2>
            <ul>
              {upcoming.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </main>
  );
}
