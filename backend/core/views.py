# backend/core/views.py

from rest_framework import generics, filters, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAdminUser
from django.core.mail import send_mail
from django.conf import settings

from .models import QuoteRequest, Testimonial, Aircraft, ContactMessage, FAQ
from .serializers import (
    QuoteRequestSerializer,
    TestimonialSerializer,
    AircraftSerializer,
    ContactMessageSerializer,
    FAQSerializer,
)


# ─────────────────────────────────────────────────────────────
# Quote Requests
# ─────────────────────────────────────────────────────────────
class QuoteRequestCreateView(generics.CreateAPIView):
    """
    POST /api/quotes/
    Anyone (including guests with no account) can submit a quote request.
    """
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save()
        self._send_notification(instance)

    def _send_notification(self, instance):
        """Send a notification email to staff when a new quote arrives."""
        try:
            subject = f"[SkyCharter] New Quote Request – {instance.get_service_type_display()}"
            message = (
                f"New quote request received:\n\n"
                f"Name:        {instance.full_name}\n"
                f"Email:       {instance.email or 'N/A'}\n"
                f"Phone:       {instance.phone}\n"
                f"Service:     {instance.get_service_type_display()}\n"
                f"Route:       {instance.origin} → {instance.destination}\n"
                f"Departure:   {instance.departure_date}\n"
                f"Passengers:  {instance.passengers}\n"
                f"Notes:       {instance.special_requests or 'None'}\n"
            )
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [settings.QUOTE_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass  # Never block the response due to email failure


class QuoteRequestListView(generics.ListAPIView):
    """
    GET /api/quotes/  — admin-only list
    """
    queryset = QuoteRequest.objects.all()
    serializer_class = QuoteRequestSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["full_name", "email", "origin", "destination"]
    ordering_fields = ["created_at", "departure_date", "status"]


# ─────────────────────────────────────────────────────────────
# Testimonials
# ─────────────────────────────────────────────────────────────
class TestimonialListView(generics.ListAPIView):
    """GET /api/testimonials/"""
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Testimonial.objects.all()
        service = self.request.query_params.get("service")
        if service:
            qs = qs.filter(service_type=service)
        featured = self.request.query_params.get("featured")
        if featured == "true":
            qs = qs.filter(is_featured=True)
        return qs


# ─────────────────────────────────────────────────────────────
# Aircraft / Fleet
# ─────────────────────────────────────────────────────────────
class AircraftListView(generics.ListAPIView):
    """GET /api/aircraft/?category=heavy"""
    serializer_class = AircraftSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = Aircraft.objects.filter(is_active=True)
        category = self.request.query_params.get("category")
        if category:
            qs = qs.filter(category=category)
        return qs


# ─────────────────────────────────────────────────────────────
# Contact
# ─────────────────────────────────────────────────────────────
class ContactCreateView(generics.CreateAPIView):
    """POST /api/contact/  — no account required"""
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save()
        try:
            send_mail(
                f"[SkyCharter] Contact: {instance.subject}",
                f"From: {instance.full_name} <{instance.email}>\n\n{instance.message}",
                settings.DEFAULT_FROM_EMAIL,
                [settings.QUOTE_NOTIFICATION_EMAIL],
                fail_silently=True,
            )
        except Exception:
            pass


# ─────────────────────────────────────────────────────────────
# FAQs
# ─────────────────────────────────────────────────────────────
class FAQListView(generics.ListAPIView):
    """GET /api/faqs/?service=private_jet"""
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        qs = FAQ.objects.filter(is_active=True)
        service = self.request.query_params.get("service")
        if service:
            qs = qs.filter(service_type=service)
        return qs


# ─────────────────────────────────────────────────────────────
# Health check
# ─────────────────────────────────────────────────────────────
class HealthCheckView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "ok"})