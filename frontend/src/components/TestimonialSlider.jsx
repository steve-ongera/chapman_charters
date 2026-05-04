// frontend/src/components/TestimonialSlider.jsx
import { useState, useEffect, useCallback } from "react";

const FALLBACK_TESTIMONIALS = [
  {
    id: 1,
    client_name: "Sarah M.",
    company: "Fortune 500 CHRO",
    service_type_display: "Private Jet Charter",
    body: "Our executive team moved between four cities in a weekend. SkyCharter made the impossible feel completely routine. The attention to detail was extraordinary.",
    rating: 5,
  },
  {
    id: 2,
    client_name: "Carlos R.",
    company: "Logistics Director, MedSupply Africa",
    service_type_display: "Air Cargo",
    body: "They arranged an emergency cargo flight for critical medical supplies in under three hours. Remarkable speed, professional crew, zero hiccups.",
    rating: 5,
  },
  {
    id: 3,
    client_name: "Aisha K.",
    company: "Senior Event Producer",
    service_type_display: "Group Air Charter",
    body: "Moved 200 guests from Nairobi to Zanzibar seamlessly for our corporate retreat. Every single detail was taken care of. We'll be back.",
    rating: 5,
  },
  {
    id: 4,
    client_name: "James Okonkwo",
    company: "CEO, Meridian Energy",
    service_type_display: "Aircraft Leasing",
    body: "The ACMI deal SkyCharter structured saved us weeks of downtime during our fleet transition. Their leasing desk knows their stuff.",
    rating: 5,
  },
  {
    id: 5,
    client_name: "Dr. Lena Brandt",
    company: "International NGO Director",
    service_type_display: "Aviation Emergency Services",
    body: "During the flood crisis we had aircraft wheels-up within 90 minutes of calling. SkyCharter is on every emergency contact list we have.",
    rating: 5,
  },
];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1.25rem" }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <i
          key={i}
          className={i < rating ? "bi bi-star-fill" : "bi bi-star"}
          style={{ color: "var(--gold)", fontSize: "0.9rem" }}
        />
      ))}
    </div>
  );
}

export default function TestimonialSlider({
  autoPlay = true,
  interval = 5000,
  fetchFromApi = false,
  serviceFilter = "",
}) {
  const [testimonials, setTestimonials] = useState(FALLBACK_TESTIMONIALS);
  const [active, setActive]             = useState(0);
  const [animating, setAnimating]       = useState(false);
  const [direction, setDirection]       = useState("next"); // "next" | "prev"
  const [paused, setPaused]             = useState(false);

  // Optionally fetch from backend
  useEffect(() => {
    if (!fetchFromApi) return;
    const url = serviceFilter
      ? `http://localhost:8000/api/testimonials/?service=${serviceFilter}`
      : "http://localhost:8000/api/testimonials/";
    fetch(url)
      .then((r) => r.json())
      .then((data) => { if (data?.length) setTestimonials(data); })
      .catch(() => {}); // silently fall back to static data
  }, [fetchFromApi, serviceFilter]);

  const goTo = useCallback(
    (index, dir = "next") => {
      if (animating) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setActive(index);
        setAnimating(false);
      }, 350);
    },
    [animating]
  );

  const next = useCallback(() => {
    goTo((active + 1) % testimonials.length, "next");
  }, [active, testimonials.length, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length, "prev");
  }, [active, testimonials.length, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || paused || testimonials.length <= 1) return;
    const t = setInterval(next, interval);
    return () => clearInterval(t);
  }, [autoPlay, paused, next, interval, testimonials.length]);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  const current = testimonials[active];

  return (
    <section
      className="testimonials section-pad"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "3rem" }}>
          <span className="label">Client Stories</span>
          <h2 className="display-md" style={{ marginTop: "0.5rem", color: "var(--navy)" }}>
            What Our Clients Say
          </h2>
          <div className="gold-line" />
        </div>

        {/* Slider */}
        <div
          style={{
            maxWidth: 780,
            margin: "0 auto",
            position: "relative",
          }}
        >
          {/* Card */}
          <div
            style={{
              background: "var(--white)",
              borderRadius: "var(--radius-lg)",
              padding: "3rem 3.5rem",
              boxShadow: "var(--shadow-lg)",
              border: "1px solid var(--gray-200)",
              minHeight: 280,
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === "next" ? "-24px" : "24px"})`
                : "translateX(0)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
              position: "relative",
            }}
          >
            {/* Quote mark */}
            <i
              className="bi bi-quote"
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "2rem",
                fontSize: "5rem",
                color: "rgba(201,168,76,.12)",
                lineHeight: 1,
              }}
            />

            <StarRating rating={current.rating} />

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                color: "var(--navy)",
                lineHeight: 1.75,
                marginBottom: "2rem",
              }}
            >
              "{current.body}"
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Avatar placeholder */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "var(--navy)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <i className="bi bi-person-fill" style={{ color: "var(--gold)", fontSize: "1.3rem" }} />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.95rem" }}>
                  {current.client_name}
                </p>
                <p style={{ color: "var(--gray-400)", fontSize: "0.8rem" }}>
                  {current.company}
                  {current.service_type_display && (
                    <>
                      {" · "}
                      <span style={{ color: "var(--gold)" }}>
                        {current.service_type_display}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Prev / Next buttons */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            style={{
              position: "absolute",
              left: "-1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--white)",
              border: "1px solid var(--gray-200)",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--navy)",
              fontSize: "1rem",
              transition: "var(--transition)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--navy)"; e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--white)"; e.currentTarget.style.color = "var(--navy)"; }}
          >
            <i className="bi bi-chevron-left" />
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            style={{
              position: "absolute",
              right: "-1.5rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "var(--white)",
              border: "1px solid var(--gray-200)",
              boxShadow: "var(--shadow-sm)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--navy)",
              fontSize: "1rem",
              transition: "var(--transition)",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--navy)"; e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "var(--white)"; e.currentTarget.style.color = "var(--navy)"; }}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </div>

        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            marginTop: "2rem",
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > active ? "next" : "prev")}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? 28 : 10,
                height: 10,
                borderRadius: 100,
                background: i === active ? "var(--gold)" : "var(--gray-200)",
                border: "none",
                cursor: "pointer",
                transition: "width 0.35s ease, background 0.35s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <p
          style={{
            textAlign: "center",
            marginTop: "1rem",
            fontSize: "0.75rem",
            color: "var(--gray-400)",
            letterSpacing: "0.06em",
          }}
        >
          {active + 1} / {testimonials.length}
        </p>
      </div>
    </section>
  );
}