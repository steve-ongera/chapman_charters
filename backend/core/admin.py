# backend/core/admin.py
from django.contrib import admin
from .models import QuoteRequest, Testimonial, Aircraft, ContactMessage, FAQ


@admin.register(QuoteRequest)
class QuoteRequestAdmin(admin.ModelAdmin):
    list_display  = ["full_name", "service_type", "origin", "destination", "departure_date", "status", "created_at"]
    list_filter   = ["status", "service_type"]
    search_fields = ["full_name", "email", "origin", "destination"]
    readonly_fields = ["created_at", "updated_at"]
    ordering = ["-created_at"]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["client_name", "company", "service_type", "rating", "is_featured"]
    list_filter  = ["service_type", "is_featured", "rating"]


@admin.register(Aircraft)
class AircraftAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "seats", "range_km", "is_active"]
    list_filter  = ["category", "is_active"]
    search_fields = ["name"]


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display  = ["full_name", "email", "subject", "created_at", "is_read"]
    list_filter   = ["is_read"]
    search_fields = ["full_name", "email", "subject"]
    readonly_fields = ["created_at"]


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ["question", "service_type", "order", "is_active"]
    list_filter  = ["service_type", "is_active"]
    ordering     = ["service_type", "order"]