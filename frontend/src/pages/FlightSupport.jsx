// frontend/src/pages/FlightSupport.jsx
import { useState } from "react";
import PageHero from "../components/PageHero";

const SUPPORT_SERVICES = [
  { icon: "bi-file-earmark-check", title: "Overflight Permits", desc: "Rapid permit procurement for any airspace globally, including complex multi-country routing." },
  { icon: "bi-fuel-pump", title: "Fuel Management", desc: "Negotiated fuel contracts and uplift coordination at 3,000+ airports." },
  { icon: "bi-building-gear", title: "Ground Handling", desc: "Dedicated handlers ensuring smooth turnarounds, slot management, and VIP services." },
  { icon: "bi-wind", title: "Weather & NOTAMs", desc: "Comprehensive pre-flight briefings and in-flight meteorological support." },
  { icon: "bi-translate", title: "Crew Visas & Hotels", desc: "Layover logistics for flight crew — visas, transport, accommodation." },
  { icon: "bi-headset", title: "24/7 Ops Support", desc: "Our flight support desk is reachable around the clock by phone, email, or SITA." },
];

export default function FlightSupport() {
  const [form, setForm]       = useState({ full_name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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
      const res = await fetch("http://localhost:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Something went wrong.");
      setSuccess(true);
    } catch {
      setError("Unable to send your message. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageHero
        label="Operational Support"
        title="Flight Support & Contact"
        subtitle="Behind every successful mission is a team of experts managing every detail on the ground."
        bgImage="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=1600&q=80"
        breadcrumb="Flight Support"
      />

      {/* Services */}
      <section className="section-pad">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "3rem" }}>
            <span className="label">Our Support Services</span>
            <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>Everything Beyond the Flight</h2>
            <div className="gold-line" />
          </div>
          <div className="grid-3">
            {SUPPORT_SERVICES.map((s) => (
              <div key={s.title} className="feature-item" style={{ padding: "1.5rem", border: "1px solid var(--gray-200)", borderRadius: "var(--radius-md)" }}>
                <div className="feature-item__icon"><i className={`bi ${s.icon}`} /></div>
                <div>
                  <div className="feature-item__title">{s.title}</div>
                  <div className="feature-item__desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-pad bg-cream">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
            {/* Info */}
            <div>
              <span className="label">Get in Touch</span>
              <h2 className="display-md" style={{ color: "var(--navy)", marginTop: "0.5rem" }}>Contact Our Team</h2>
              <div className="gold-line" />
              <p style={{ color: "var(--gray-700)", marginBottom: "2rem" }}>
                Whether you need flight support, a quote, or just have a question —
                our team is ready to help.
              </p>

              {[
                ["bi-telephone-fill", "24/7 Operations Line", "+1 800 SKY-CHARTER"],
                ["bi-envelope-fill", "General Enquiries", "ops@skycharter.aero"],
                ["bi-airplane-fill", "Charter Desk", "charter@skycharter.aero"],
                ["bi-box-seam", "Cargo Desk", "cargo@skycharter.aero"],
              ].map(([icon, label, value]) => (
                <div key={label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <i className={`bi ${icon}`} style={{ color: "var(--gold)", fontSize: "1.1rem" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</p>
                    <p style={{ fontWeight: 500, color: "var(--navy)" }}>{value}</p>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: "2rem", padding: "1.5rem", background: "var(--navy)", borderRadius: "var(--radius-md)", color: "var(--white)" }}>
                <p style={{ fontWeight: 700, marginBottom: "0.3rem" }}>
                  <i className="bi bi-clock" style={{ color: "var(--gold)", marginRight: "0.5rem" }} />Operational Hours
                </p>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,.7)" }}>24 hours / 7 days / 365 days — we never close.</p>
              </div>
            </div>

            {/* Form */}
            <div>
              {success ? (
                <div className="quote-form" style={{ textAlign: "center", padding: "3rem" }}>
                  <i className="bi bi-check-circle-fill" style={{ color: "#22c55e", fontSize: "3rem", display: "block", marginBottom: "1rem" }} />
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--navy)" }}>Message Sent!</h3>
                  <p style={{ color: "var(--gray-700)", marginTop: "0.5rem" }}>We'll reply within 2 hours.</p>
                </div>
              ) : (
                <div className="quote-form">
                  <h2 className="quote-form__title">Send Us a Message</h2>
                  <p className="quote-form__subtitle">No account required</p>
                  {error && (
                    <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "var(--radius-sm)", padding: "0.75rem 1rem", color: "#b91c1c", marginBottom: "1rem", fontSize: "0.875rem" }}>
                      {error}
                    </div>
                  )}
                  <form onSubmit={submit}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input className="form-control" name="full_name" value={form.full_name} onChange={change} required placeholder="Your name" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email *</label>
                        <input className="form-control" type="email" name="email" value={form.email} onChange={change} required placeholder="you@example.com" />
                      </div>
                      <div className="form-group span-2">
                        <label className="form-label">Subject *</label>
                        <input className="form-control" name="subject" value={form.subject} onChange={change} required placeholder="How can we help?" />
                      </div>
                      <div className="form-group span-2">
                        <label className="form-label">Message *</label>
                        <textarea className="form-control" name="message" value={form.message} onChange={change} required placeholder="Tell us more..." style={{ minHeight: 140 }} />
                      </div>
                      <div className="form-group span-2">
                        <button className="btn btn-gold" type="submit" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "1rem" }}>
                          {loading ? "Sending…" : <><i className="bi bi-send" /> Send Message</>}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}