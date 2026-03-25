import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/docs", label: "Docs" }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="docs-container site-footer-inner">
        <div>
          <p className="docs-label" style={{ marginBottom: "0.5rem" }}>
            ChaandUI
          </p>
          <p className="site-footer-copy">Moonish components for calm, premium interfaces.</p>
        </div>

        <nav className="site-footer-nav" aria-label="Footer">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-footer-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="site-footer-copy">© 2026 ChaandUI. Crafted under moonlight.</p>
      </div>
    </footer>
  );
}
