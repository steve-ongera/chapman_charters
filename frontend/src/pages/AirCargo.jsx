// frontend/src/pages/AirCargo.jsx
import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";

const CARGO_TYPES = [
  { icon: "bi-thermometer-snow", title: "Perishables & Pharma", desc: "Cold-chain certified aircraft for vaccines, fresh produce, and biologics." },
  { icon: "bi-radioactive", title: "Hazardous Materials", desc: "IATA-compliant handling of DG cargo with full documentation support." },
  { icon: "bi-box2", title: "Outsized & Heavy Lift", desc: "Antonov An-124, Boeing 747F, and other freighters for oversized loads." },
  { icon: "bi-clock-history", title: "Time-Critical Freight", desc: "AOG parts, organs for transplant — 24/7 emergency cargo anywhere on Earth." },
  { icon: "bi-gem", title: "Valuables & Fine Art", desc: "Secure, insured transport for jewellery, art, and high-value goods." },
  { icon: "bi-heart-pulse", title: "Humanitarian Aid", desc: "Relief cargo moved swiftly to disaster zones in partnership with NGOs." },
];

export default function AirCargo() {
  return (
    <>
      <PageHero
        label="Freight Solutions"
        title="Air Cargo Charter"
        subtitle="From a single pallet to full-freighter loads — we move your cargo when it absolutely has to be there."
        bgImage="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=80"
        breadcrumb="Air Cargo"
      />

      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Cargo Specialisations</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>What We Transport</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {CARGO_TYPES.map((c) => (
              <div key={c.title} style={{
                border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)",
                padding: "1.75rem", background: "var(--white)", boxShadow: "var(--shadow-sm)", transition: "var(--transition)"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.transform = "none"; }}
              >
                <i className={`bi ${c.icon}`} style={{ fontSize: "2rem", color: "var(--gold)", display: "block", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.15rem", color: "var(--navy)", marginBottom: "0.5rem" }}>{c.title}</h3>
                <p style={{ color: "var(--gray-700)", fontSize: "0.875rem" }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <span className="label" style={{ color: "var(--gold-light)" }}>Move Your Cargo</span>
              <h2 className="display-md text-white" style={{ marginTop: "0.5rem" }}>
                Speed. Reliability. Anywhere.
              </h2>
              <div className="gold-line" />
              <p style={{ color: "rgba(255,255,255,.7)", lineHeight: 1.8 }}>
                Our cargo desk operates 24/7/365. Tell us your load, origin, destination,
                and timeline — we'll have aircraft options back to you within the hour.
                No account required.
              </p>
            </div>
            <QuoteForm defaultService="air_cargo" title="Get a Cargo Quote" />
          </div>
        </div>
      </section>
    </>
  );
}