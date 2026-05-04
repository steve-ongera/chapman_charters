// frontend/src/components/PageHero.jsx
import { Link } from "react-router-dom";

export default function PageHero({ label, title, subtitle, bgImage, breadcrumb }) {
  return (
    <section className="page-hero">
      {bgImage && (
        <div
          className="page-hero__bg"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="container page-hero__content">
        {breadcrumb && (
          <nav style={{ marginBottom: "1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,.5)" }}>
            <Link to="/" style={{ color: "rgba(255,255,255,.5)" }}>Home</Link>
            <i className="bi bi-chevron-right" style={{ margin: "0 0.5rem", fontSize: "0.65rem" }} />
            <span style={{ color: "var(--gold)" }}>{breadcrumb}</span>
          </nav>
        )}
        {label && <span className="label">{label}</span>}
        <h1 className="page-hero__title" style={{ marginTop: label ? "0.5rem" : 0 }}>{title}</h1>
        {subtitle && <p className="page-hero__subtitle">{subtitle}</p>}
      </div>
    </section>
  );
}