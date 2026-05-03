# backend/core/urls.py

from django.urls import path
from . import views

urlpatterns = [
    # ── Quote Requests ──────────────────────────────────────
    # POST  → guest submit (no account needed)
    # GET   → admin list (IsAdminUser)
    path("quotes/",        views.QuoteRequestCreateView.as_view(), name="quote-create"),
    path("quotes/list/",   views.QuoteRequestListView.as_view(),   name="quote-list"),

    # ── Testimonials ────────────────────────────────────────
    # GET ?service=private_jet  ?featured=true
    path("testimonials/",  views.TestimonialListView.as_view(),    name="testimonial-list"),

    # ── Aircraft / Fleet ────────────────────────────────────
    # GET ?category=heavy
    path("aircraft/",      views.AircraftListView.as_view(),       name="aircraft-list"),

    # ── Contact ─────────────────────────────────────────────
    path("contact/",       views.ContactCreateView.as_view(),      name="contact-create"),

    # ── FAQs ────────────────────────────────────────────────
    # GET ?service=air_cargo
    path("faqs/",          views.FAQListView.as_view(),            name="faq-list"),

    # ── Health ──────────────────────────────────────────────
    path("health/",        views.HealthCheckView.as_view(),        name="health"),
]