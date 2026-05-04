// frontend/src/pages/AviationEmergencyServices.jsx
import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";

const AES_SERVICES = [
  { icon: "bi-heart-pulse-fill", title: "Medical Evacuation", desc: "Air ambulance with ICU-certified medical teams, available within hours globally." },
  { icon: "bi-droplet-half", title: "Disaster Relief Cargo", desc: "Emergency logistics for food, water, shelter, and medical supplies post-disaster." },
  { icon: "bi-shield-shaded", title: "Humanitarian Missions", desc: "NGO and government relief operations with specialist aircraft and crew." },
  { icon: "bi-tools", title: "AOG Support", desc: "Aircraft-on-ground parts flown anywhere to minimise airline downtime." },
  { icon: "bi-person-walking", title: "Evacuation Flights", desc: "Rapid extraction of personnel from conflict zones or natural disasters." },
  { icon: "bi-broadcast", title: "Command & Control", desc: "Airborne surveillance and communication platforms for emergency coordinators." },
];

export default function AviationEmergencyServices() {
  return (
    <>
      <PageHero
        label="Emergency Aviation"
        title="Aviation Emergency Services"
        subtitle="When every minute counts — our AES team mobilises aircraft within hours, 24/7/365, anywhere on Earth."
        bgImage="https://images.unsplash.com/photo-1505139329-a79ee56e21ad?w=1600&q=80"
        breadcrumb="Aviation Emergency Services"
      />

      {/* Urgency Banner */}
      <div style={{ background: "#dc2626", color: "var(--white)", padding: "1rem 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <i className="bi bi-telephone-fill" style={{ fontSize: "1.25rem", animation: "pulse 1.5s ease infinite" }} />
          <strong>24/7 Emergency Hotline:</strong>
          <a href="tel:+18005792468" style={{ color: "var(--white)", fontWeight: 700, fontSize: "1.1rem" }}>+1 800 SKY-CHARTER</a>
          <span style={{ opacity: 0.8, fontSize: "0.875rem" }}>— Response time under 15 minutes</span>
        </div>
      </div>

      {/* Services */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">AES Capabilities</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>What We Deploy</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {AES_SERVICES.map((s) => (
              <div key={s.title} style={{
                background: "var(--navy)", borderRadius: "var(--radius-md)",
                padding: "2rem", transition: "var(--transition)"
              }}
                onMouseEnter={e => e.currentTarget.style.background = "#1a3a6b"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--navy)"}
              >
                <i className={`bi ${s.icon}`} style={{ fontSize: "2rem", color: "#ef4444", display: "block", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--white)", marginBottom: "0.5rem" }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,.7)", fontSize: "0.875rem" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="quote-section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <span className="label" style={{ color: "#ef4444" }}>Emergency Request</span>
              <h2 className="display-md text-white" style={{ marginTop: "0.5rem" }}>Activate AES Now</h2>
              <div style={{ width: 60, height: 3, background: "#ef4444", margin: "1rem 0 1.5rem" }} />
              <p style={{ color: "rgba(255,255,255,.75)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                For genuine emergencies, call our 24/7 hotline immediately.
                For planned or non-critical missions, submit a request below and our
                AES coordinator will contact you within 15 minutes.
              </p>
              <a href="tel:+18005792468" className="btn btn-gold" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
                <i className="bi bi-telephone-fill" /> Call Emergency Line
              </a>
            </div>
            <QuoteForm defaultService="aes" title="AES Mission Request" />
          </div>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </>
  );
}