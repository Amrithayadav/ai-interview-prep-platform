import { useState } from "react";
import { NAV_LINKS } from "../../data/constants";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="aip-nav">
        <a href="#" className="aip-nav-logo">
          ⚡ AI Interview Prep
        </a>

        <ul className="aip-nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>

        <div className="aip-nav-actions">
          <a href="#" className="aip-btn-ghost">Log in</a>
          <a href="#" className="aip-btn-primary">Get Started Free</a>
        </div>

        <button className="aip-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {menuOpen && (
        <div className="aip-mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>
      )}
    </>
  );
}