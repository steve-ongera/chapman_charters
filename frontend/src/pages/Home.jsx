// frontend/src/pages/Home.jsx
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ServiceCard from "../components/ServiceCard";
import TestimonialSlider from "../components/TestimonialSlider";

const SERVICES = [
  {
    icon: "bi-airplane",
    title: "Private Jet Charter",
    description:
      "Travel on your schedule. Access thousands of aircraft worldwide for seamless point-to-point luxury travel with full privacy.",
    to: "/services/private-jet",
    tag: "Most Popular",
  },
  {
    icon: "bi-people-fill",
    title: "Group Air Charter",
    description:
      "Custom group travel for sports teams, corporate events, pilgrimages and incentive trips — every seat exclusively yours.",
    to: "/services/group-air-charter",
  },
  {
    icon: "bi-box-seam",
    title: "Air Cargo Charter",
    description:
      "Time-critical freight, outsized loads, and perishables transported with precision, care, and full documentation support.",
    to: "/services/air-cargo",
  },
  {
    icon: "bi-file-earmark-text",
    title: "Aircraft Leasing",
    description:
      "ACMI, dry, and wet lease solutions for airlines and operators seeking flexible, short or long-term capacity.",
    to: "/services/aircraft-leasing",
  },
  {
    icon: "bi-headset",
    title: "Flight Support",
    description:
      "Permits, ground handling, fuel uplift, and overflight clearances — handled by our 24/7 operations desk.",
    to: "/services/flight-support",
  },
  {
    icon: "bi-shield-plus",
    title: "Aviation Emergency",
    description:
      "Rapid deployment of medical, humanitarian, and disaster-relief flights within hours of your call.",
    to: "/services/aviation-emergency",
    tag: "24 / 7",
  },
];

const FEATURES = [
  {
    icon: "bi-globe2",
    title: "Global Network",
    desc: "Access to 7,000+ aircraft across 180 countries — we find the right aircraft wherever you need it.",
  },
  {
    icon: "bi-clock-history",
    title: "24/7 Operations",
    desc: "Our experts are on call every minute of every day, including weekends and public holidays.",
  },
  {
    icon: "bi-patch-check",
    title: "Safety First",
    desc: "Only ARGUS or IS-BAO rated operators on our platform. We audit, you fly with confidence.",
  },
  {
    icon: "bi-currency-dollar",
    title: "Best-Price Promise",
    desc: "Competitive quotes with no hidden fees or markups. Transparent pricing every time.",
  },
];

const STATS = [
  { num: "7000", suffix: "+", label: "Aircraft Available" },
  { num: "180",  suffix: "+", label: "Countries Served"  },
  { num: "24",   suffix: "/7",label: "Operations"        },
  { num: "30",   suffix: "+", label: "Years Experience"  },
];

const DESTINATIONS = [
  { city: "Dubai",     code: "DXB", icon: "bi-building"             },
  { city: "New York",  code: "JFK", icon: "bi-buildings"            },
  { city: "London",    code: "LCY", icon: "bi-bank"                 },
  { city: "Singapore", code: "SIN", icon: "bi-globe-asia-australia" },
  { city: "Nairobi",   code: "NBO", icon: "bi-geo-alt"              },
  { city: "Paris",     code: "LBG", icon: "bi-lamp"                 },
];

const PARTNERS = ["ARGUS", "IS-BAO", "IATA", "NBAA", "EBAA", "ICAO"];

const STEPS = [
  { num: "01", icon: "bi-send",          title: "Submit a Request",  desc: "Fill in our quick form — no account needed. Takes under 2 minutes." },
  { num: "02", icon: "bi-search",        title: "We Source Options", desc: "Our team scans 7,000+ aircraft and returns competitive options within 2 hours." },
  { num: "03", icon: "bi-check2-circle", title: "Confirm & Pay",     desc: "Choose your preferred option, confirm the details, and we handle everything else." },
  { num: "04", icon: "bi-airplane-fill", title: "Take Off",          desc: "Board at your chosen terminal and fly on your schedule — seamlessly." },
];

// ── Animated counter ─────────────────────────────────────────
function StatCard({ num, suffix, label, animStart }) {
  const target   = parseInt(num, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animStart) return;
    let startTime = null;
    const duration = 1600;
    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [animStart, target]);

  return (
    <div style={{ textAlign: "center" }}>
      <div className="hero__stat-num">{animStart ? count : 0}{suffix}</div>
      <div className="hero__stat-label">{label}</div>
    </div>
  );
}

// ── Inline 2-step quote panel ────────────────────────────────
function InlineQuotePanel() {
  const [step, setStep]       = useState(1);
  const [service, setService] = useState("private_jet");
  const [form, setForm]       = useState({ full_name: "", phone: "", email: "", origin: "", destination: "", departure_date: "", passengers: 1 });
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState("");

  function change(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/quotes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          service_type: service,
          passengers: Number(form.passengers),
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
    } catch {
      setError("Unable to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const panelStyle = {
    background: "rgba(255,255,255,.06)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: "var(--radius-lg)",
    padding: "2.5rem",
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,.08)",
    border: "1px solid rgba(255,255,255,.18)",
    borderRadius: "var(--radius-sm)",
    padding: "0.7rem 1rem",
    color: "var(--white)",
    fontSize: "0.875rem",
    fontFamily: "var(--font-body)",
    colorScheme: "dark",
  };

  const labelStyle = {
    fontSize: "0.7rem",
    fontWeight: 700,
    color: "var(--gold)",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.35rem",
  };

  function advanceStep() {
    if (!form.origin || !form.destination || !form.departure_date) {
      setError("Please fill in departure, destination, and date.");
      return;
    }
    setError("");
    setStep(2);
  }

  function reset() {
    setDone(false);
    setStep(1);
    setForm({ full_name: "", phone: "", email: "", origin: "", destination: "", departure_date: "", passengers: 1 });
  }

  if (done) {
    return (
      <div style={{ ...panelStyle, textAlign: "center", padding: "4rem 2rem" }}>
        <i className="bi bi-check-circle-fill" style={{ fontSize: "3rem", color: "#22c55e", display: "block", marginBottom: "1rem" }} />
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--white)", marginBottom: "0.5rem" }}>
          Request Sent!
        </h3>
        <p style={{ color: "rgba(255,255,255,.65)" }}>
          Our team will contact you within 2 hours with tailored options.
        </p>
        <button className="btn btn-gold" style={{ marginTop: "1.5rem" }} onClick={reset}>
          New Request
        </button>
      </div>
    );
  }

  return (
    <div style={panelStyle}>
      <p style={{ ...labelStyle, marginBottom: "0.25rem" }}>Instant Quote</p>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", color: "var(--white)", marginBottom: "0.25rem" }}>
        Plan Your Flight
      </h3>
      <p style={{ color: "rgba(255,255,255,.45)", fontSize: "0.8rem", marginBottom: "1.75rem" }}>
        No account needed · Response in &lt; 2 hours
      </p>

      {/* Progress bar */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.75rem" }}>
        {[1, 2].map((s) => (
          <div key={s} style={{
            flex: 1, height: 3, borderRadius: 100,
            background: s <= step ? "var(--gold)" : "rgba(255,255,255,.15)",
            transition: "background 0.3s ease",
          }} />
        ))}
      </div>

      {error && (
        <div style={{
          background: "rgba(239,68,68,.15)", border: "1px solid rgba(239,68,68,.3)",
          borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem",
          color: "#fca5a5", fontSize: "0.85rem", marginBottom: "1rem",
        }}>
          {error}
        </div>
      )}

      <form onSubmit={submit}>
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Service</label>
              <select value={service} onChange={(e) => setService(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                <option value="private_jet"      style={{ color: "#000" }}>Private Jet Charter</option>
                <option value="group_air"         style={{ color: "#000" }}>Group Air Charter</option>
                <option value="air_cargo"         style={{ color: "#000" }}>Air Cargo</option>
                <option value="aircraft_leasing"  style={{ color: "#000" }}>Aircraft Leasing</option>
                <option value="flight_support"    style={{ color: "#000" }}>Flight Support</option>
                <option value="aes"               style={{ color: "#000" }}>Aviation Emergency</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={labelStyle}>From</label>
                <input style={inputStyle} name="origin" value={form.origin} onChange={change} placeholder="Departure city" required />
              </div>
              <div>
                <label style={labelStyle}>To</label>
                <input style={inputStyle} name="destination" value={form.destination} onChange={change} placeholder="Arrival city" required />
              </div>
              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" style={inputStyle} name="departure_date" value={form.departure_date}
                  onChange={change} min={new Date().toISOString().split("T")[0]} required />
              </div>
              <div>
                <label style={labelStyle}>Passengers</label>
                <input type="number" style={inputStyle} name="passengers" value={form.passengers}
                  onChange={change} min="1" max="500" />
              </div>
            </div>
            <button type="button" className="btn btn-gold" style={{ justifyContent: "center", padding: "0.85rem" }} onClick={advanceStep}>
              Continue <i className="bi bi-arrow-right" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input style={inputStyle} name="full_name" value={form.full_name} onChange={change} placeholder="Your name" required />
            </div>
            <div>
              <label style={labelStyle}>Phone *</label>
              <input style={inputStyle} name="phone" value={form.phone} onChange={change} placeholder="+1 555 000 0000" required />
            </div>
            <div>
              <label style={labelStyle}>Email (optional)</label>
              <input type="email" style={inputStyle} name="email" value={form.email} onChange={change} placeholder="you@example.com" />
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button type="button" className="btn btn-outline" style={{ flex: "0 0 auto" }} onClick={() => setStep(1)}>
                <i className="bi bi-arrow-left" /> Back
              </button>
              <button type="submit" className="btn btn-gold" style={{ flex: 1, justifyContent: "center" }} disabled={loading}>
                {loading ? "Submitting…" : <><i className="bi bi-send" /> Get My Quote</>}
              </button>
            </div>
            <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,.3)", textAlign: "center" }}>
              <i className="bi bi-lock" style={{ marginRight: "0.3rem" }} />
              Your data is secure and never shared.
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [heroLoaded, setHeroLoaded]     = useState(false);
  const [quickForm, setQuickForm]       = useState({ origin: "", destination: "", departure_date: "" });
  const [quickService, setQuickService] = useState("private_jet");

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = document.getElementById("stats-anchor");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function changeQuick(e) {
    const { name, value } = e.target;
    setQuickForm((f) => ({ ...f, [name]: value }));
  }

  function submitQuick(e) {
    e.preventDefault();
    const params = new URLSearchParams({ ...quickForm, service_type: quickService });
    window.location.href = `/services/private-jet?${params.toString()}`;
  }

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="hero" style={{ minHeight: "100vh" }}>
        <div className="hero__bg" />
        <div className="hero__overlay" />
        <div className="container" style={{ width: "100%" }}>
          <div
            className="hero__content"
            style={{
              opacity: heroLoaded ? 1 : 0,
              transform: heroLoaded ? "translateY(0)" : "translateY(28px)",
              transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
          >
            <div className="hero__badge">
              <i className="bi bi-star-fill" /> Trusted by 10,000+ Clients Worldwide
            </div>

            <h1 className="hero__title">
              The Sky is<br />Your <em>Runway</em>
            </h1>

            <p className="hero__subtitle">
              Private jet, cargo, group, emergency — SkyCharter connects you with
              the world's finest aircraft. Request a quote instantly, no account needed.
            </p>

            {/* Quick-search bar */}
            <form
              onSubmit={submitQuick}
              style={{
                background: "rgba(255,255,255,.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,.18)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem 1.5rem",
                marginBottom: "2rem",
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr auto",
                gap: "0.75rem",
                alignItems: "flex-end",
              }}
            >
              {[
                { label: "From",    name: "origin",         placeholder: "Departure city", type: "text" },
                { label: "To",      name: "destination",    placeholder: "Arrival city",   type: "text" },
                { label: "Date",    name: "departure_date", placeholder: "",               type: "date" },
              ].map(({ label, name, placeholder, type }) => (
                <div key={name}>
                  <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={quickForm[name]}
                    onChange={changeQuick}
                    placeholder={placeholder}
                    min={type === "date" ? new Date().toISOString().split("T")[0] : undefined}
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,.1)",
                      border: "1px solid rgba(255,255,255,.2)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.6rem 0.85rem",
                      color: "var(--white)",
                      fontSize: "0.875rem",
                      fontFamily: "var(--font-body)",
                      colorScheme: "dark",
                    }}
                  />
                </div>
              ))}

              <div>
                <label style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>
                  Service
                </label>
                <select
                  value={quickService}
                  onChange={(e) => setQuickService(e.target.value)}
                  style={{
                    width: "100%",
                    background: "rgba(255,255,255,.1)",
                    border: "1px solid rgba(255,255,255,.2)",
                    borderRadius: "var(--radius-sm)",
                    padding: "0.6rem 0.85rem",
                    color: "var(--white)",
                    fontSize: "0.875rem",
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                  }}
                >
                  <option value="private_jet"      style={{ color: "#000" }}>Private Jet</option>
                  <option value="group_air"         style={{ color: "#000" }}>Group Charter</option>
                  <option value="air_cargo"         style={{ color: "#000" }}>Air Cargo</option>
                  <option value="aircraft_leasing"  style={{ color: "#000" }}>Leasing</option>
                  <option value="flight_support"    style={{ color: "#000" }}>Flight Support</option>
                  <option value="aes"               style={{ color: "#000" }}>Emergency (AES)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-gold" style={{ whiteSpace: "nowrap", padding: "0.65rem 1.25rem" }}>
                <i className="bi bi-search" /> Search
              </button>
            </form>

            <div className="hero__actions">
              <Link to="/services/private-jet" className="btn btn-gold">
                <i className="bi bi-send" /> Request a Quote
              </Link>
              <Link to="/about" className="btn btn-outline">
                <i className="bi bi-play-circle" /> Our Story
              </Link>
            </div>

            {/* Stats */}
            <div id="stats-anchor" className="hero__stats">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} animStart={statsVisible} />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: "absolute", bottom: "2rem", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
          color: "rgba(255,255,255,.35)", fontSize: "0.65rem",
          letterSpacing: "0.12em", textTransform: "uppercase",
          animation: "scrollBounce 2.2s ease infinite",
        }}>
          <span>Scroll</span>
          <i className="bi bi-chevron-compact-down" style={{ fontSize: "1.1rem" }} />
        </div>
      </section>

      {/* ══════════ TRUST BAR ══════════ */}
      <div style={{
        background: "var(--navy-mid)",
        borderBottom: "1px solid rgba(255,255,255,.06)",
        padding: "1rem 0",
      }}>
        <div className="container" style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: "2.5rem", flexWrap: "wrap",
        }}>
          <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--gold)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Certified &amp; Accredited By
          </span>
          {PARTNERS.map((p) => (
            <span key={p} style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,.4)", letterSpacing: "0.06em" }}>{p}</span>
          ))}
        </div>
      </div>

      {/* ══════════ SERVICES ══════════ */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3.5rem" }}>
            <span className="label">What We Offer</span>
            <h2 className="display-md" style={{ marginTop: "0.5rem", color: "var(--navy)" }}>
              Aviation Solutions for Every Need
            </h2>
            <div className="gold-line" />
            <p style={{ color: "var(--gray-700)", maxWidth: 540, margin: "0 auto", fontSize: "0.95rem" }}>
              From a single executive to a full freighter load — our global network
              matches every mission with the right aircraft.
            </p>
          </div>
          <div className="grid-3">
            {SERVICES.map((s) => <ServiceCard key={s.to} {...s} />)}
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS ══════════ */}
      <section className="section-pad bg-cream">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3.5rem" }}>
            <span className="label">Simple Process</span>
            <h2 className="display-md" style={{ marginTop: "0.5rem", color: "var(--navy)" }}>
              From Request to Take-Off in 4 Steps
            </h2>
            <div className="gold-line" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0", position: "relative" }}>
            {/* Connector line */}
            <div style={{
              position: "absolute", top: 36, left: "12.5%", right: "12.5%",
              height: 2,
              background: "linear-gradient(90deg, var(--gold) 0%, rgba(201,168,76,.15) 100%)",
              zIndex: 0,
              pointerEvents: "none",
            }} />

            {STEPS.map((step, i) => (
              <div key={step.num} style={{ textAlign: "center", padding: "0 1.5rem" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "var(--navy)", border: "3px solid var(--gold)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1.5rem", position: "relative", zIndex: 1,
                  boxShadow: "0 0 0 6px var(--cream)",
                }}>
                  <i className={`bi ${step.icon}`} style={{ color: "var(--gold)", fontSize: "1.5rem" }} />
                </div>
                <span style={{
                  fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.15em",
                  color: "var(--gold)", textTransform: "uppercase",
                  display: "block", marginBottom: "0.4rem",
                }}>
                  Step {step.num}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
                  {step.title}
                </h3>
                <p style={{ color: "var(--gray-700)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY US + INLINE QUOTE ══════════ */}
      <section className="section-pad bg-navy">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div>
              <span className="label">Why SkyCharter</span>
              <h2 className="display-md text-white" style={{ marginTop: "0.5rem" }}>
                The Broker the World's Busiest People Trust
              </h2>
              <div className="gold-line" />
              <p style={{ color: "rgba(255,255,255,.7)", marginBottom: "2.5rem", lineHeight: 1.9 }}>
                Since 1990, SkyCharter has engineered complex air charter missions with
                an obsessive focus on safety, speed, and service. We don't just book
                flights — we solve problems at 40,000 feet.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
                {FEATURES.map((f) => (
                  <div key={f.title} className="feature-item">
                    <div className="feature-item__icon">
                      <i className={`bi ${f.icon}`} />
                    </div>
                    <div>
                      <div className="feature-item__title" style={{ color: "var(--white)" }}>{f.title}</div>
                      <div className="feature-item__desc" style={{ color: "rgba(255,255,255,.6)" }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "2.5rem" }}>
                <Link to="/about" className="btn btn-outline">
                  <i className="bi bi-arrow-right-circle" /> Learn More
                </Link>
              </div>
            </div>
            <InlineQuotePanel />
          </div>
        </div>
      </section>

      {/* ══════════ POPULAR DESTINATIONS ══════════ */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Popular Routes</span>
            <h2 className="display-md" style={{ marginTop: "0.5rem", color: "var(--navy)" }}>
              Fly to the World's Greatest Cities
            </h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {DESTINATIONS.map((d) => (
              <Link
                key={d.city}
                to="/services/private-jet"
                style={{
                  display: "flex", alignItems: "center", gap: "1.25rem",
                  padding: "1.5rem", borderRadius: "var(--radius-md)",
                  border: "1px solid var(--gray-200)", background: "var(--white)",
                  boxShadow: "var(--shadow-sm)", transition: "var(--transition)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "var(--gold)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "var(--gray-200)";
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: "var(--radius-sm)",
                  background: "var(--navy)", display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <i className={`bi ${d.icon}`} style={{ color: "var(--gold)", fontSize: "1.3rem" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--navy)", fontWeight: 600 }}>{d.city}</p>
                  <p style={{ fontSize: "0.75rem", color: "var(--gold)", fontWeight: 700, letterSpacing: "0.1em" }}>{d.code}</p>
                </div>
                <i className="bi bi-arrow-right" style={{ marginLeft: "auto", color: "var(--gray-400)", fontSize: "0.9rem" }} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <TestimonialSlider autoPlay interval={5500} fetchFromApi={false} />

      {/* ══════════ CTA BANNER ══════════ */}
      <section style={{
        background: "linear-gradient(135deg, var(--navy) 0%, #1a3a6b 100%)",
        padding: "5rem 0", position: "relative", overflow: "hidden",
      }}>
        {/* Decorative rings */}
        {[420, 280].map((size) => (
          <div key={size} style={{
            position: "absolute", right: `-${size / 8}rem`, top: "50%",
            transform: "translateY(-50%)",
            width: size, height: size, borderRadius: "50%",
            border: "2px solid rgba(201,168,76,.1)",
            pointerEvents: "none",
          }} />
        ))}

        <div className="container" style={{
          position: "relative", zIndex: 1,
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "2rem",
        }}>
          <div>
            <span className="label">Ready to Fly?</span>
            <h2 style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: "var(--white)", marginTop: "0.5rem",
            }}>
              Your Next Flight Starts Here
            </h2>
            <p style={{ color: "rgba(255,255,255,.6)", marginTop: "0.5rem" }}>
              Our team responds within 2 hours — no account, no commitment.
            </p>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/services/private-jet" className="btn btn-gold" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
              <i className="bi bi-send" /> Request a Quote
            </Link>
            <Link to="/services/flight-support" className="btn btn-outline" style={{ fontSize: "1rem", padding: "1rem 2rem" }}>
              <i className="bi bi-telephone" /> Speak to Us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0);  opacity: .35; }
          50%       { transform: translateX(-50%) translateY(7px); opacity: .7;  }
        }
        @media (max-width: 768px) {
          form[style*="grid-template-columns: 1fr 1fr 1fr 1fr auto"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
          div[style*="repeat(4, 1fr)"] > div:nth-child(1),
          div[style*="repeat(4, 1fr)"] > div:nth-child(2) {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </>
  );
}