"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/docs", label: "Docs" }
];

const versions = ["v0.6.0", "v0.5.0", "v0.4.2"];

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"moon" | "eclipse">("moon");
  const [version, setVersion] = useState(versions[0]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("chaandui-docs-theme");
    const storedVersion = window.localStorage.getItem("chaandui-docs-version");

    if (storedTheme === "moon" || storedTheme === "eclipse") {
      setTheme(storedTheme);
      document.documentElement.setAttribute("data-theme", storedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "moon");
    }

    if (storedVersion && versions.includes(storedVersion)) {
      setVersion(storedVersion);
    }
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "moon" ? "eclipse" : "moon";
      document.documentElement.setAttribute("data-theme", next);
      window.localStorage.setItem("chaandui-docs-theme", next);
      return next;
    });
  }

  function handleVersionChange(nextVersion: string) {
    setVersion(nextVersion);
    window.localStorage.setItem("chaandui-docs-version", nextVersion);
  }

  return (
    <header className="site-header">
      <div className="docs-container site-header-inner">
        <Link href="/" className="site-brand" aria-label="ChaandUI Home">
          <span className="site-brand-mark" aria-hidden>
            ☾
          </span>
          <span>ChaandUI</span>
        </Link>

        <button
          className="site-menu-button"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <div className={`site-controls ${menuOpen ? "is-open" : ""}`} id="site-navigation">
          <nav className="site-nav" aria-label="Primary navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`site-nav-link ${isActive ? "is-active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="site-actions">
            <label className="site-version" htmlFor="version-select">
              <span className="site-inline-label">Version</span>
              <select
                id="version-select"
                value={version}
                onChange={(event) => handleVersionChange(event.target.value)}
              >
                {versions.map((entry) => (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              className="site-theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "moon" ? "eclipse" : "moon"} theme`}
              title={`Switch to ${theme === "moon" ? "eclipse" : "moon"} theme`}
            >
              <span aria-hidden className="site-theme-toggle-icon">
                {theme === "moon" ? "☾" : "✦"}
              </span>
              <span className="sr-only">
                {theme === "moon" ? "Moon theme" : "Eclipse theme"}
              </span>
            </button>

            <Link href="/docs" className="site-cta">
              Start Building
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
