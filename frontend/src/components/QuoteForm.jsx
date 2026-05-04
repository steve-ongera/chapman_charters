// frontend/src/components/QuoteForm.jsx
import { useState } from "react";

const SERVICE_OPTIONS = [
  { value: "private_jet",      label: "Private Jet Charter" },
  { value: "group_air",        label: "Group Air Charter" },
  { value: "air_cargo",        label: "Air Cargo" },
  { value: "aircraft_leasing", label: "Aircraft Leasing" },
  { value: "flight_support",   label: "Flight Support" },
  { value: "aes",              label: "Aviation Emergency Services" },
];

const INITIAL = {
  full_name: "", email: "", phone: "", company_name: "",
  service_type: "private_jet",
  origin: "", destination: "",
  departure_date: "", return_date: "",
  passengers: 1, cargo_weight_kg: "", special_requests: "",
};

export default function QuoteForm({ defaultService = "private_jet", title = "Request a Quote" }) {
  const [form, setForm]       = useState({ ...INITIAL, service_type: defaultService });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");

  const isCargo = ["air_cargo", "aes"].includes(form.service_type);

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
          passengers: Number(form.passengers),
          cargo_weight_kg: form.cargo_weight_kg ? Number(form.cargo_weight_kg) : null,
          return_date: form.return_date || null,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(Object.values(data).flat().join(" "));
      }
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="quote-form form-success">
        <i className="bi bi-check-circle-fill" style={{ color: "#22c55e", fontSize: "3rem", marginBottom: "1rem", display: "block" }} />
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", color: "var(--navy)", marginBottom: "0.5rem" }}>
          Request Received!
        </h3>
        <p style={{ color: "var(--gray-700)" }}>
          Our team will contact you within 2 hours with a tailored quote.
        </p>
        <button
          className="btn btn-navy"
          style={{ marginTop: "1.5rem" }}
          onClick={() => { setSuccess(false); setForm({ ...INITIAL, service_type: defaultService }); }}
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="quote-form">
      <h2 className="quote-form__title">{title}</h2>
      <p className="quote-form__subtitle">
        No account needed · Response within 2 hours · Available 24/7
      </p>

      {error && (
        <div style={{
          background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "var(--radius-sm)",
          padding: "0.75rem 1rem", color: "#b91c1c", marginBottom: "1.25rem", fontSize: "0.875rem"
        }}>
          <i className="bi bi-exclamation-circle" style={{ marginRight: "0.5rem" }} />{error}
        </div>
      )}

      <form onSubmit={submit}>
        <div className="form-grid">
          {/* Personal */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input className="form-control" name="full_name" value={form.full_name}
              onChange={change} required placeholder="John Smith" />
          </div>
          <div className="form-group">
            <label className="form-label">Phone *</label>
            <input className="form-control" name="phone" value={form.phone}
              onChange={change} required placeholder="+1 555 000 0000" />
          </div>
          <div className="form-group">
            <label className="form-label">Email (optional)</label>
            <input className="form-control" type="email" name="email" value={form.email}
              onChange={change} placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Company</label>
            <input className="form-control" name="company_name" value={form.company_name}
              onChange={change} placeholder="Your company (optional)" />
          </div>

          {/* Service */}
          <div className="form-group span-2">
            <label className="form-label">Service Type *</label>
            <select className="form-control" name="service_type" value={form.service_type}
              onChange={change} required>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>

          {/* Route */}
          <div className="form-group">
            <label className="form-label">Departure *</label>
            <input className="form-control" name="origin" value={form.origin}
              onChange={change} required placeholder="City or ICAO/IATA code" />
          </div>
          <div className="form-group">
            <label className="form-label">Destination *</label>
            <input className="form-control" name="destination" value={form.destination}
              onChange={change} required placeholder="City or ICAO/IATA code" />
          </div>

          {/* Dates */}
          <div className="form-group">
            <label className="form-label">Departure Date *</label>
            <input className="form-control" type="date" name="departure_date" value={form.departure_date}
              onChange={change} required min={new Date().toISOString().split("T")[0]} />
          </div>
          <div className="form-group">
            <label className="form-label">Return Date</label>
            <input className="form-control" type="date" name="return_date" value={form.return_date}
              onChange={change} min={form.departure_date || new Date().toISOString().split("T")[0]} />
          </div>

          {/* Passengers / Cargo */}
          {isCargo ? (
            <div className="form-group span-2">
              <label className="form-label">Cargo Weight (kg) *</label>
              <input className="form-control" type="number" name="cargo_weight_kg"
                value={form.cargo_weight_kg} onChange={change} placeholder="e.g. 5000" min="1" />
            </div>
          ) : (
            <div className="form-group span-2">
              <label className="form-label">Passengers *</label>
              <input className="form-control" type="number" name="passengers"
                value={form.passengers} onChange={change} required min="1" max="500" />
            </div>
          )}

          {/* Notes */}
          <div className="form-group span-2">
            <label className="form-label">Special Requests</label>
            <textarea className="form-control" name="special_requests" value={form.special_requests}
              onChange={change} placeholder="Catering, medical equipment, hazmat, etc." />
          </div>

          <div className="form-group span-2">
            <button className="btn btn-gold" type="submit" disabled={loading}
              style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "1rem" }}>
              {loading
                ? <><i className="bi bi-arrow-repeat" style={{ animation: "spin 1s linear infinite" }} /> Submitting…</>
                : <><i className="bi bi-send" /> Request My Quote</>}
            </button>
            <p style={{ fontSize: "0.75rem", color: "var(--gray-400)", marginTop: "0.75rem", textAlign: "center" }}>
              <i className="bi bi-lock" style={{ marginRight: "0.3rem" }} />
              Your data is secure and never shared. No account required.
            </p>
          </div>
        </div>
      </form>

      <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}