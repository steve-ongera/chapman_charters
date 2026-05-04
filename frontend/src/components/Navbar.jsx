// frontend/src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const services = [
  { to: "/services/private-jet",       icon: "bi-airplane",          label: "Private Jet Charter" },
  { to: "/services/group-air-charter", icon: "bi-people-fill",        label: "Group Air Charter" },
  { to: "/services/air-cargo",         icon: "bi-box-seam",           label: "Air Cargo" },
  { to: "/services/aircraft-leasing",  icon: "bi-file-earmark-text",  label: "Aircraft Leasing" },
  { to: "/services/flight-support",    icon: "bi-headset",            label: "Flight Support" },
  { to: "/services/aviation-emergency",icon: "bi-shield-plus",        label: "Aviation Emergency (AES)" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : "transparent"}`}>
        <div className="container navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <i className="bi bi-airplane-engines-fill" style={{ color: "var(--gold)" }} />
            Sky<span>Charter</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar__links">
            <NavLink to="/" end>Home</NavLink>

            {/* Services dropdown */}
            <div className="navbar__dropdown">
              <NavLink to="/services/private-jet">
                Services <i className="bi bi-chevron-down" style={{ fontSize: "0.7rem" }} />
              </NavLink>
              <div className="navbar__dropdown-menu">
                {services.map((s) => (
                  <Link key={s.to} to={s.to}>
                    <i className={`bi ${s.icon}`} />
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink to="/about">About</NavLink>
            <NavLink to="/services/flight-support">Contact</NavLink>
          </div>

          <div className="navbar__cta">
            <Link to="/services/private-jet" className="btn btn-gold">
              <i className="bi bi-send" /> Get a Quote
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="bi bi-list" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="mobile-menu__close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <i className="bi bi-x-lg" />
        </button>

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>

        <p style={{ color: "var(--gold)", fontSize: "0.75rem", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.5rem 1rem 0.25rem" }}>
          Services
        </p>

        {services.map((s) => (
          <Link key={s.to} to={s.to} onClick={() => setMenuOpen(false)}>
            <i className={`bi ${s.icon}`} style={{ marginRight: "0.5rem", color: "var(--gold)" }} />
            {s.label}
          </Link>
        ))}

        <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>

        <Link
          to="/services/private-jet"
          className="btn btn-gold"
          style={{ marginTop: "1rem", justifyContent: "center" }}
          onClick={() => setMenuOpen(false)}
        >
          <i className="bi bi-send" /> Get a Quote
        </Link>
      </div>
    </>
  );
}