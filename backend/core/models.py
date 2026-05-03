# backend/core/models.py

from django.db import models
from django.utils import timezone


# ─────────────────────────────────────────────────────────────
# Service Types  (used as category tags)
# ─────────────────────────────────────────────────────────────
class ServiceType(models.TextChoices):
    PRIVATE_JET       = "private_jet",       "Private Jet Charter"
    GROUP_AIR         = "group_air",         "Group Air Charter"
    AIR_CARGO         = "air_cargo",         "Air Cargo"
    AIRCRAFT_LEASING  = "aircraft_leasing",  "Aircraft Leasing"
    FLIGHT_SUPPORT    = "flight_support",    "Flight Support"
    AES               = "aes",               "Aviation Emergency Services"


# ─────────────────────────────────────────────────────────────
# Quote Request  (no account needed)
# ─────────────────────────────────────────────────────────────
class QuoteRequest(models.Model):
    """
    A guest enquiry / booking request.
    No user account is required; email is optional so phone-only enquiries work.
    """

    class Status(models.TextChoices):
        NEW        = "new",        "New"
        IN_REVIEW  = "in_review",  "In Review"
        QUOTED     = "quoted",     "Quoted"
        CONFIRMED  = "confirmed",  "Confirmed"
        CANCELLED  = "cancelled",  "Cancelled"

    # ── Personal details ──────────────────────────────────────
    full_name    = models.CharField(max_length=150)
    email        = models.EmailField(blank=True)          # optional
    phone        = models.CharField(max_length=30)
    company_name = models.CharField(max_length=150, blank=True)

    # ── Trip details ─────────────────────────────────────────
    service_type   = models.CharField(max_length=30, choices=ServiceType.choices)
    origin         = models.CharField(max_length=150, help_text="Departure city or airport")
    destination    = models.CharField(max_length=150, help_text="Arrival city or airport")
    departure_date = models.DateField()
    return_date    = models.DateField(null=True, blank=True)
    passengers     = models.PositiveSmallIntegerField(default=1)
    cargo_weight_kg= models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True,
        help_text="Applicable for Air Cargo / AES requests"
    )
    special_requests = models.TextField(blank=True)

    # ── Metadata ──────────────────────────────────────────────
    status     = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Quote Request"
        verbose_name_plural = "Quote Requests"

    def __str__(self):
        return f"{self.full_name} | {self.get_service_type_display()} | {self.origin} → {self.destination}"


# ─────────────────────────────────────────────────────────────
# Testimonial
# ─────────────────────────────────────────────────────────────
class Testimonial(models.Model):
    client_name  = models.CharField(max_length=100)
    company      = models.CharField(max_length=100, blank=True)
    service_type = models.CharField(max_length=30, choices=ServiceType.choices, blank=True)
    body         = models.TextField()
    rating       = models.PositiveSmallIntegerField(default=5)   # 1–5
    is_featured  = models.BooleanField(default=False)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_featured", "-created_at"]

    def __str__(self):
        return f"{self.client_name} – {self.rating}★"


# ─────────────────────────────────────────────────────────────
# Fleet / Aircraft (displayed on service pages)
# ─────────────────────────────────────────────────────────────
class Aircraft(models.Model):
    class Category(models.TextChoices):
        LIGHT      = "light",      "Light Jet"
        MIDSIZE    = "midsize",    "Midsize Jet"
        HEAVY      = "heavy",      "Heavy Jet"
        ULTRA_LONG = "ultra_long", "Ultra-Long Range"
        TURBOPROP  = "turboprop",  "Turboprop"
        HELICOPTER = "helicopter", "Helicopter"
        CARGO      = "cargo",      "Cargo Aircraft"

    name        = models.CharField(max_length=100)
    category    = models.CharField(max_length=20, choices=Category.choices)
    seats       = models.PositiveSmallIntegerField()
    range_km    = models.PositiveIntegerField(help_text="Max range in kilometres")
    max_payload_kg = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField(blank=True)
    image       = models.ImageField(upload_to="aircraft/", null=True, blank=True)
    is_active   = models.BooleanField(default=True)

    class Meta:
        ordering = ["category", "name"]

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


# ─────────────────────────────────────────────────────────────
# Contact / General Enquiry
# ─────────────────────────────────────────────────────────────
class ContactMessage(models.Model):
    full_name  = models.CharField(max_length=150)
    email      = models.EmailField()
    subject    = models.CharField(max_length=200)
    message    = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read    = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} – {self.subject[:50]}"


# ─────────────────────────────────────────────────────────────
# FAQ  (per service page)
# ─────────────────────────────────────────────────────────────
class FAQ(models.Model):
    service_type = models.CharField(
        max_length=30, choices=ServiceType.choices, blank=True,
        help_text="Leave blank for global FAQs"
    )
    question  = models.CharField(max_length=300)
    answer    = models.TextField()
    order     = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ["service_type", "order"]

    def __str__(self):
        return self.question[:80]