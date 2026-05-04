// frontend/src/pages/PrivateJetCharter.jsx
import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";

const JET_TYPES = [
  { icon: "bi-airplane", name: "Light Jets", seats: "4–7", range: "Up to 3,000 km", example: "Citation CJ3, Phenom 300", desc: "Perfect for short hops and small groups needing efficiency." },
  { icon: "bi-airplane-fill", name: "Midsize Jets", seats: "7–9", range: "Up to 5,500 km", example: "Citation XLS+, Learjet 60", desc: "Ideal balance of range, cabin comfort, and cost." },
  { icon: "bi-airplane-engines", name: "Heavy Jets", seats: "10–16", range: "Up to 10,000 km", example: "Gulfstream G450, Falcon 2000", desc: "Transcontinental travel with full stand-up cabin." },
  { icon: "bi-airplane-engines-fill", name: "Ultra-Long Range", seats: "12–19", range: "12,000+ km", example: "Gulfstream G700, Global 7500", desc: "Nonstop between any two cities on Earth." },
];

export default function PrivateJetCharter() {
  return (
    <>
      <PageHero
        label="Private Aviation"
        title="Private Jet Charter"
        subtitle="Fly exactly when, where, and how you want — complete flexibility with world-class comfort."
        bgImage="https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1600&q=80"
        breadcrumb="Private Jet Charter"
      />

      {/* ── Fleet Overview ── */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Aircraft Categories</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>Choose Your Aircraft</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-4">
            {JET_TYPES.map((j) => (
              <div key={j.name} style={{
                border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)",
                padding: "1.75rem", transition: "var(--transition)"
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--gray-200)"}
              >
                <i className={`bi ${j.icon}`} style={{ fontSize: "2rem", color: "var(--gold)", display: "block", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--navy)", marginBottom: "0.5rem" }}>{j.name}</h3>
                <div style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginBottom: "0.75rem" }}>
                  <span><i className="bi bi-people" style={{ marginRight: "0.3rem" }} />{j.seats} seats</span>
                  <span style={{ marginLeft: "1rem" }}><i className="bi bi-geo" style={{ marginRight: "0.3rem" }} />{j.range}</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--gray-700)", marginBottom: "0.75rem" }}>{j.desc}</p>
                <p style={{ fontSize: "0.75rem", color: "var(--gold)", fontStyle: "italic" }}>e.g. {j.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="section-pad bg-cream">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <span className="label">Why Private?</span>
              <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>The Private Jet Advantage</h2>
              <div className="gold-line" />
              {[
                ["bi-clock", "Depart on your schedule — no delays, no queues"],
                ["bi-shield-check", "Access to 5,000+ airports including remote strips"],
                ["bi-person-check", "Full privacy for sensitive business or personal travel"],
                ["bi-star", "Bespoke catering, in-flight WiFi, and luxury interiors"],
                ["bi-airplane-fill", "No account required — get a quote in minutes"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <i className={`bi ${icon}`} style={{ color: "var(--gold)", marginTop: "0.15rem", fontSize: "1.1rem" }} />
                  <span style={{ color: "var(--gray-700)" }}>{text}</span>
                </div>
              ))}
            </div>
            <QuoteForm defaultService="private_jet" title="Plan Your Flight" />
          </div>
        </div>
      </section>
    </>
  );
}