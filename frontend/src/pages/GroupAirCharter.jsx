// frontend/src/pages/GroupAirCharter.jsx
import PageHero from "../components/PageHero";
import QuoteForm from "../components/QuoteForm";

const USE_CASES = [
  { icon: "bi-trophy", title: "Sports Teams", desc: "Charter flights for professional and amateur sports clubs — equipment, staff, and all." },
  { icon: "bi-building", title: "Corporate Events", desc: "Incentive trips, annual conferences, and executive retreats transported in style." },
  { icon: "bi-moon-stars", title: "Religious Pilgrimages", desc: "Hajj, Umrah, and other faith-based travel managed with cultural sensitivity." },
  { icon: "bi-music-note-beamed", title: "Entertainment Tours", desc: "Touring bands, film crews, and performers — complex logistics made simple." },
  { icon: "bi-mortarboard", title: "Student Groups", desc: "Educational tours and exchange programmes with safety as the priority." },
  { icon: "bi-ship", title: "Cruise Transfers", desc: "Fly-cruise packages with seamless connections at any port worldwide." },
];

export default function GroupAirCharter() {
  return (
    <>
      <PageHero
        label="Group Travel"
        title="Group Air Charter"
        subtitle="From 20 to 500 passengers — tailored group flights with every seat reserved exclusively for your party."
        bgImage="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1600&q=80"
        breadcrumb="Group Air Charter"
      />

      {/* Use Cases */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Solutions For</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>Who We Fly</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {USE_CASES.map((u) => (
              <div key={u.title} style={{
                background: "var(--white)", border: "1px solid var(--gray-200)",
                borderRadius: "var(--radius-md)", padding: "2rem",
                boxShadow: "var(--shadow-sm)", transition: "var(--transition)"
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--gray-200)"; e.currentTarget.style.transform = "none"; }}
              >
                <i className={`bi ${u.icon}`} style={{ fontSize: "2rem", color: "var(--gold)", display: "block", marginBottom: "1rem" }} />
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--navy)", marginBottom: "0.5rem" }}>{u.title}</h3>
                <p style={{ color: "var(--gray-700)", fontSize: "0.9rem" }}>{u.desc}</p>
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
              <span className="label" style={{ color: "var(--gold-light)" }}>Ready to Fly?</span>
              <h2 className="display-md text-white" style={{ marginTop: "0.5rem" }}>
                Your Group Deserves Better Than Scheduled
              </h2>
              <div className="gold-line" />
              <p style={{ color: "rgba(255,255,255,.7)", lineHeight: 1.8 }}>
                With a group charter, your party has the entire aircraft. Depart from
                your preferred airport, set your own schedule, and arrive together —
                without the chaos of commercial travel.
              </p>
            </div>
            <QuoteForm defaultService="group_air" title="Get a Group Quote" />
          </div>
        </div>
      </section>
    </>
  );
}