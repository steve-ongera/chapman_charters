// frontend/src/components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <i className="bi bi-airplane-engines-fill" style={{ color: "var(--gold)", marginRight: "0.4rem" }} />
              Sky<span>Charter</span>
            </div>
            <p className="footer__desc">
              Global air charter brokerage connecting passengers and cargo with
              the world's finest aircraft. Available 24/7, every day of the year.
            </p>
            <div className="footer__socials">
              {[
                ["bi-twitter-x", "#"],
                ["bi-linkedin", "#"],
                ["bi-facebook", "#"],
                ["bi-instagram", "#"],
              ].map(([icon, href]) => (
                <a key={icon} href={href} className="footer__social-link" target="_blank" rel="noreferrer">
                  <i className={`bi ${icon}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="footer__heading">Services</p>
            <div className="footer__links">
              <Link to="/services/private-jet">Private Jet Charter</Link>
              <Link to="/services/group-air-charter">Group Air Charter</Link>
              <Link to="/services/air-cargo">Air Cargo</Link>
              <Link to="/services/aircraft-leasing">Aircraft Leasing</Link>
              <Link to="/services/flight-support">Flight Support</Link>
              <Link to="/services/aviation-emergency">Aviation Emergency</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="footer__heading">Company</p>
            <div className="footer__links">
              <Link to="/about">About Us</Link>
              <Link to="/about">Careers</Link>
              <Link to="/about">News</Link>
              <Link to="/services/flight-support">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="footer__heading">Contact</p>
            <div className="footer__links">
              <span><i className="bi bi-telephone" style={{ color: "var(--gold)", marginRight: "0.5rem" }} />+1 800 SKY-CHARTER</span>
              <span><i className="bi bi-envelope" style={{ color: "var(--gold)", marginRight: "0.5rem" }} />ops@skycharter.aero</span>
              <span><i className="bi bi-geo-alt" style={{ color: "var(--gold)", marginRight: "0.5rem" }} />London · Dubai · New York</span>
              <span style={{ color: "var(--gold)", fontSize: "0.8rem" }}>
                <i className="bi bi-clock" style={{ marginRight: "0.4rem" }} />24 / 7 / 365
              </span>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} SkyCharter Aviation Ltd. All rights reserved.</span>
          <span>
            <Link to="#" style={{ marginRight: "1.5rem" }}>Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}