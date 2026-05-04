// frontend/src/pages/AircraftLeasing.jsx
import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";

const LEASE_TYPES = [
  {
    icon: "bi-person-workspace",
    title: "Dry Lease",
    desc: "Aircraft only — no crew, maintenance, or insurance. Ideal for airlines with their own AOC and operational capability.",
    duration: "Typically 2+ years",
  },
  {
    icon: "bi-people",
    title: "Wet Lease (ACMI)",
    desc: "Aircraft, Crew, Maintenance, and Insurance included. The lessor operates the flight under the lessee's flight number.",
    duration: "Weeks to years",
  },
  {
    icon: "bi-calendar-check",
    title: "Short-Term Lease",
    desc: "Ad-hoc capacity for seasonal peaks, fleet disruption cover, or new-route trials. Rapid mobilisation.",
    duration: "Days to weeks",
  },
];

export default function AircraftLeasing() {
  return (
    <>
      <PageHero
        label="Fleet Solutions"
        title="Aircraft Leasing"
        subtitle="Flexible capacity when you need it — ACMI, dry lease, and ad-hoc wet lease solutions for operators worldwide."
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80"
        breadcrumb="Aircraft Leasing"
      />

      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Lease Options</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>Find the Right Structure</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {LEASE_TYPES.map((l) => (
              <div key={l.title} style={{
                background: "var(--navy)", borderRadius: "var(--radius-md)",
                padding: "2.5rem", color: "var(--white)"
              }}>
                <i className={`bi ${l.icon}`} style={{ fontSize: "2.5rem", color: "var(--gold)", display: "block", marginBottom: "1.25rem" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", marginBottom: "0.75rem" }}>{l.title}</h3>
                <p style={{ color: "rgba(255,255,255,.7)", fontSize: "0.9rem", marginBottom: "1rem", lineHeight: 1.7 }}>{l.desc}</p>
                <span className="tag">{l.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <span className="label">Leasing Enquiry</span>
              <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>
                Discuss Your Requirements
              </h2>
              <div className="gold-line" />
              <p style={{ color: "var(--gray-700)", lineHeight: 1.8 }}>
                Our leasing specialists work with airlines, charter operators, and governments
                to structure the right deal. Tell us your requirements and we'll present
                options within 24 hours. No obligation, no account needed.
              </p>
            </div>
            <QuoteForm defaultService="aircraft_leasing" title="Leasing Enquiry" />
          </div>
        </div>
      </section>
    </>
  );
}