// frontend/src/pages/AboutUs.jsx
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const TEAM = [
  { name: "James Whitfield", role: "CEO & Co-Founder", icon: "bi-person-circle" },
  { name: "Amara Osei", role: "Director of Operations", icon: "bi-person-circle" },
  { name: "Lena Hartmann", role: "Head of Cargo", icon: "bi-person-circle" },
  { name: "Rajiv Mehta", role: "Chief Safety Officer", icon: "bi-person-circle" },
];

const VALUES = [
  { icon: "bi-shield-check", title: "Safety Above All", desc: "Every operator we work with is independently audited. We refuse to cut corners." },
  { icon: "bi-handshake", title: "Client First", desc: "We measure success by whether our clients keep coming back — 94% do." },
  { icon: "bi-globe-americas", title: "Global Reach", desc: "180+ countries, 7,000+ aircraft, one point of contact." },
  { icon: "bi-lightning-charge", title: "Agility", desc: "Markets move fast. So do we — quotes in under 2 hours, flights in under 24." },
];

export default function AboutUs() {
  return (
    <>
      <PageHero
        label="Our Story"
        title="About SkyCharter"
        subtitle="Three decades of aviation expertise — connecting people, cargo, and opportunities across the globe."
        bgImage="https://images.unsplash.com/photo-1483354568375-variable?w=1600&q=80"
        breadcrumb="About Us"
      />

      {/* Story */}
      <section className="section-pad">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <span className="label">Since 1990</span>
              <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>
                Built on Trust, Driven by Excellence
              </h2>
              <div className="gold-line" />
              <p style={{ color: "var(--gray-700)", lineHeight: 1.9, marginBottom: "1.25rem" }}>
                SkyCharter was founded with a simple conviction: every flight, whether carrying
                a CEO or critical cargo, deserves the same uncompromising attention to detail.
              </p>
              <p style={{ color: "var(--gray-700)", lineHeight: 1.9, marginBottom: "2rem" }}>
                From a single London office in 1990, we've grown into a global network spanning
                six continents — yet our culture remains rooted in the personal relationships
                that made us who we are.
              </p>
              <Link to="/services/private-jet" className="btn btn-navy">
                <i className="bi bi-send" /> Work With Us
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {[
                ["30+", "Years in Aviation"],
                ["180+", "Countries Served"],
                ["7,000+", "Aircraft Available"],
                ["94%", "Client Retention"],
              ].map(([num, label]) => (
                <div key={label} style={{
                  background: "var(--navy)", borderRadius: "var(--radius-md)",
                  padding: "2rem", textAlign: "center"
                }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", color: "var(--gold)" }}>{num}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,.6)", marginTop: "0.4rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-cream">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">What Drives Us</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>Our Values</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-4">
            {VALUES.map((v) => (
              <div key={v.title} style={{ textAlign: "center" }}>
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "var(--navy)", display: "flex", alignItems: "center",
                  justifyContent: "center", margin: "0 auto 1rem"
                }}>
                  <i className={`bi ${v.icon}`} style={{ color: "var(--gold)", fontSize: "1.5rem" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--navy)", marginBottom: "0.5rem" }}>{v.title}</h3>
                <p style={{ color: "var(--gray-700)", fontSize: "0.875rem" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Leadership</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>Meet the Team</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-4">
            {TEAM.map((t) => (
              <div key={t.name} style={{
                textAlign: "center", border: "1px solid var(--gray-200)",
                borderRadius: "var(--radius-md)", padding: "2rem", background: "var(--white)"
              }}>
                <i className={`bi ${t.icon}`} style={{ fontSize: "4rem", color: "var(--navy)", display: "block", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--navy)" }}>{t.name}</h3>
                <p style={{ color: "var(--gold)", fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: "0.25rem" }}>{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="quote-section">
        <div className="container text-center" style={{ maxWidth: 600, margin: "0 auto" }}>
          <span className="label" style={{ color: "var(--gold-light)" }}>Ready?</span>
          <h2 className="display-md text-white" style={{ marginTop: "0.5rem" }}>Let's Fly Together</h2>
          <div className="gold-line" style={{ margin: "1rem auto 1.5rem" }} />
          <p style={{ color: "rgba(255,255,255,.7)", marginBottom: "2rem" }}>
            No account required. Get a quote in under 2 hours.
          </p>
          <Link to="/services/private-jet" className="btn btn-gold" style={{ fontSize: "1rem", padding: "1rem 2.5rem" }}>
            <i className="bi bi-send" /> Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}