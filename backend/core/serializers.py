# backend/core/serializers.py

from rest_framework import serializers
from .models import QuoteRequest, Testimonial, Aircraft, ContactMessage, FAQ


class QuoteRequestSerializer(serializers.ModelSerializer):
    """
    Used for both creating (POST – no auth) and reading (admin list).
    Status is read-only for guests; admins update it via the admin panel.
    """
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    service_type_display = serializers.CharField(
        source="get_service_type_display", read_only=True
    )

    class Meta:
        model = QuoteRequest
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "company_name",
            "service_type",
            "service_type_display",
            "origin",
            "destination",
            "departure_date",
            "return_date",
            "passengers",
            "cargo_weight_kg",
            "special_requests",
            "status",
            "status_display",
            "created_at",
        ]
        read_only_fields = ["id", "status", "status_display", "created_at"]

    def validate_departure_date(self, value):
        from django.utils.timezone import now
        if value < now().date():
            raise serializers.ValidationError("Departure date cannot be in the past.")
        return value

    def validate(self, data):
        ret = super().validate(data)
        if ret.get("return_date") and ret["return_date"] < ret["departure_date"]:
            raise serializers.ValidationError(
                {"return_date": "Return date must be after departure date."}
            )
        return ret


class TestimonialSerializer(serializers.ModelSerializer):
    service_type_display = serializers.CharField(
        source="get_service_type_display", read_only=True
    )

    class Meta:
        model = Testimonial
        fields = [
            "id",
            "client_name",
            "company",
            "service_type",
            "service_type_display",
            "body",
            "rating",
            "is_featured",
        ]


class AircraftSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source="get_category_display", read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Aircraft
        fields = [
            "id",
            "name",
            "category",
            "category_display",
            "seats",
            "range_km",
            "max_payload_kg",
            "description",
            "image_url",
        ]

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ["id", "full_name", "email", "subject", "message", "created_at"]
        read_only_fields = ["id", "created_at"]


class FAQSerializer(serializers.ModelSerializer):
    service_type_display = serializers.CharField(
        source="get_service_type_display", read_only=True
    )

    class Meta:
        model = FAQ
        fields = ["id", "service_type", "service_type_display", "question", "answer", "order"]