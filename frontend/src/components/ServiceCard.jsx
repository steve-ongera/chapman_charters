// frontend/src/components/ServiceCard.jsx
import { Link } from "react-router-dom";

export default function ServiceCard({ icon, title, description, to, tag }) {
  return (
    <div className="service-card">
      <div className="service-card__icon-wrap">
        <i className={`bi ${icon} service-card__icon`} />
      </div>
      <div className="service-card__body">
        {tag && <span className="tag" style={{ marginBottom: "0.75rem", display: "inline-block" }}>{tag}</span>}
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__desc">{description}</p>
        <Link to={to} className="service-card__link">
          Learn More <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </div>
  );
}