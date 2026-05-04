// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import QuoteForm from "../components/QuoteForm";

const SERVICES = [
  {
    icon: "bi-airplane",
    title: "Private Jet Charter",
    description: "Travel on your schedule. Access thousands of aircraft worldwide for seamless point-to-point luxury travel.",
    to: "/services/private-jet",
    tag: "Most Popular",
  },
  {
    icon: "bi-people-fill",
    title: "Group Air Charter",
    description: "Custom group travel for sports teams, corporate events, pilgrimages and incentive trips.",
    to: "/services/group-air-charter",
  },
  {
    icon: "bi-box-seam",
    title: "Air Cargo Charter",
    description: "Time-critical freight, outsized loads, and perishables transported with precision and care.",
    to: "/services/air-cargo",
  },
  {
    icon: "bi-file-earmark-text",
    title: "Aircraft Leasing",
    description: "ACMI, dry, and wet lease solutions for airlines and operators seeking flexible capacity.",
    to: "/services/aircraft-leasing",
  },
  {
    icon: "bi-headset",
    title: "Flight Support",
    description: "Permits, ground handling, fuel uplift, and overflight clearances — handled by our 24/7 ops team.",
    to: "/services/flight-support",
  },
  {
    icon: "bi-shield-plus",
    title: "Aviation Emergency Services",
    description: "Rapid deployment of medical, humanitarian, and disaster-relief flights within hours.",
    to: "/services/aviation-emergency",
    tag: "24/7",
  },
];

const FEATURES = [
  { icon: "bi-globe2",        title: "Global Network",       desc: "Access to 7,000+ aircraft across 180 countries." },
  { icon: "bi-clock-history", title: "24/7 Operations",      desc: "Our experts are on call every minute of every day." },
  { icon: "bi-patch-check",   title: "Safety First",         desc: "Only ARGUS or IS-BAO-rated operators on our platform." },
  { icon: "bi-currency-dollar", title: "Best-Price Promise", desc: "Competitive quotes — no markups or hidden fees." },
];

const TESTIMONIALS = [
  { name: "Sarah M.", company: "Fortune 500 CHRO", body: "Our executive team moved between four cities in a weekend. SkyCharter made the impossible feel routine.", stars: 5 },
  { name: "Carlos R.", company: "Logistics Director", body: "They arranged an emergency cargo flight for medical supplies in under three hours. Remarkable.", stars: 5 },
  { name: "Aisha K.", company: "Event Producer", body: "Moved 200 guests from Nairobi to Zanzibar seamlessly. Every detail was perfect.", stars: 5 },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="container">
          <div className="hero__content">
            <div className="hero__badge">
              <i className="bi bi-star-fill" /> Trusted by 10,000+ Clients Worldwide
            </div>
            <h1 className="hero__title">
              The Sky is Your <em>Runway</em>
            </h1>
            <p className="hero__subtitle">
              Private jet, cargo, group, emergency — SkyCharter connects you with
              the world's finest aircraft. No account needed to request a quote.
            </p>
            <div className="hero__actions">
              <Link to="/services/private-jet" className="btn btn-gold">
                <i className="bi bi-send" /> Request a Quote
              </Link>
              <Link to="/about" className="btn btn-outline">
                <i className="bi bi-play-circle" /> Our Story
              </Link>
            </div>
            <div className="hero__stats">
              {[["7,000+", "Aircraft Available"], ["180+", "Countries Served"], ["24/7", "Operations"], ["30+", "Years Experience"]].map(([num, label]) => (
                <div key={label}>
                  <div className="hero__stat-num">{num}</div>
                  <div className="hero__stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ──────────────────────────────── */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3.5rem" }}>
            <span className="label">What We Offer</span>
            <h2 className="display-md" style={{ marginTop: "0.5rem", color: "var(--navy)" }}>
              Aviation Solutions for Every Need
            </h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {SERVICES.map((s) => <ServiceCard key={s.to} {...s} />)}
          </div>
        </div>
      </section>

      {/* ── Why Us ────────────────────────────────── */}
      <section className="section-pad bg-navy">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <span className="label">Why SkyCharter</span>
              <h2 className="display-md text-white" style={{ marginTop: "0.5rem" }}>
                The Broker the World's Busiest People Trust
              </h2>
              <div className="gold-line" />
              <p style={{ color: "rgba(255,255,255,.7)", marginBottom: "2.5rem", lineHeight: 1.8 }}>
                Since 1990, SkyCharter has been arranging complex air charter missions with
                an obsessive focus on safety, speed, and service. We don't just book flights —
                we engineer solutions.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {FEATURES.map((f) => (
                  <div key={f.title} className="feature-item">
                    <div className="feature-item__icon"><i className={`bi ${f.icon}`} /></div>
                    <div>
                      <div className="feature-item__title text-white">{f.title}</div>
                      <div className="feature-item__desc" style={{ color: "rgba(255,255,255,.6)" }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
              borderRadius: "var(--radius-lg)", padding: "2rem", backdropFilter: "blur(10px)"
            }}>
              <QuoteForm title="Get an Instant Quote" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section className="section-pad testimonials">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Client Stories</span>
            <h2 className="display-md" style={{ marginTop: "0.5rem", color: "var(--navy)" }}>
              What Our Clients Say
            </h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="testimonial-card">
                <div className="testimonial-card__stars">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <i key={i} className="bi bi-star-fill" />
                  ))}
                </div>
                <p className="testimonial-card__body">"{t.body}"</p>
                <p className="testimonial-card__author">{t.name}</p>
                <p className="testimonial-card__company">{t.company}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────── */}
      <section style={{ background: "var(--gold)", padding: "3rem 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--navy)" }}>
              Ready to Take Off?
            </h2>
            <p style={{ color: "rgba(10,22,40,.7)", marginTop: "0.25rem" }}>
              Our team responds within 2 hours — no account required.
            </p>
          </div>
          <Link to="/services/private-jet" className="btn btn-navy">
            <i className="bi bi-telephone-fill" /> Speak to an Expert
          </Link>
        </div>
      </section>
    </>
  );
}